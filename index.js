const fs = require("fs");
const Discord = require("discord.js");
const { botname, userid, marker } = require("./config/bot.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const command_files = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const cooldowns = new Discord.Collection();
const DEFAULT_COOLDOWN = 10;

for (const file of command_files) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("message", (message) => {
	if (message.author.bot) return;

	let args;
	if (message.content.startsWith(botname)) {
		args = message.content.slice(botname.length).trim().split(/ +/);
	} else if (message.content.startsWith(userid)) {
		args = message.content.slice(userid.length).trim().split(/ +/);
	} else {
		return;
	}

	let command_name = args.shift().slice(marker.length).toLowerCase();
	if (!command_name) command_name = "help";

	if (!client.commands.has(command_name)) {
		return message.channel.send(`${message.author}\n\`${marker}${command_name}\` command not found!`);
	}
	
	const command = client.commands.get(command_name);
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldown_amount = (command.cooldown || DEFAULT_COOLDOWN) * 1000;

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

client.login(process.env.TOKEN);