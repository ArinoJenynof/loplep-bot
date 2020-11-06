import { readdir } from "fs";
import Discord from "discord.js";
import { trigger, marker } from "./config/bot.js";

const client = new Discord.Client();
const cooldowns = new Discord.Collection();
const roles = new Discord.Collection();

client.commands = new Discord.Collection();
readdir("./commands", async (err, files) => {
	if (err) {
		console.error(err);
	} else {
		for (const file of files) {
			const { command } = await import(`./commands/${file}`);
			client.commands.set(command.name, command);
		}
		client.login(process.env.TOKEN);
	}
});

client.once("ready", () => {
	client.guilds.cache.forEach((guild) => {
		roles.set(guild.id, guild.roles.cache.find(role => role.name === client.user.username).id);
	});
});

client.on("message", (message) => {
	if (message.author.bot) return;

	let args;
	if (message.content.startsWith(trigger)) {
		args = message.content.slice(trigger.length).trim().split(/ +/);
	} else if (message.content.startsWith(`<@!${client.user.id}>`)) {
		args = message.content.slice(`<@!${client.user.id}>`.length).trim().split(/ +/);
	} else if (message.content.startsWith(`<@&${roles.get(message.guild.id)}>`)) {
		args = message.content.slice(`<@&${roles.get(message.guild.id)}>`.length).trim().split(/ +/);
	} else {
		return;
	}

	let command_name = args.shift().slice(marker.length).toLowerCase();

	if (!client.commands.has(command_name)) {
		command_name = "help";
	}

	const command = client.commands.get(command_name);
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldown_amount = (command.cooldown || 10) * 1000;

	if (timestamps.has(message.author.id)) {
		const expiration = timestamps.get(message.author.id) + cooldown_amount;
		if (now < expiration) {
			const left = (expiration - now) / 1000;
			return message.channel.send(`${message.author}\nPlease wait ${left.toFixed(1)} second(s)`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldown_amount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("There was an error trying to execute that command!");
	}
});
