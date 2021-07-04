import Discord from "discord.js";
import * as exported from "./commands/_exported.js";
import { triggers } from "./core/config.js";

const client = new Discord.Client();
client.commands = new Discord.Collection();
const roles = new Discord.Collection();

for (const [key, value] of Object.entries(exported)) {
	client.commands.set(key, value);
}

// Client's event listener
client.once("ready", () => {
	client.guilds.cache.each(guild => {
		const role = guild.roles.cache.find(role => role.name === client.user.username);
		roles.set(guild.id, `<@&${role.id}>`);
	});
	triggers.push(`<@!${client.user.id}>`);
	triggers.push(`<@${client.user.id}>`);
});

client.on("message", message => {
	const startsWithTrigger = () => {
		for (const trigger of [...triggers, roles.get(message.guild.id)]) {
			if (message.content.startsWith(trigger)) {
				message.content = message.content.substr(trigger.length);
				return true;
			}
		}
		return false;
	}

	if (message.author.bot || !startsWithTrigger()) return;

	const args = message.content.trim().split(/ +/);
	const req = args.shift().toLowerCase();

	if (!client.commands.has(req)) {
		client.commands.get("help").execute(message, args);
	} else {
		client.commands.get(req).execute(message, args);
	}
});

// Node process listener
// Windows sends SIGINT, heroku sends SIGTERM
for (const event of ["SIGINT", "SIGTERM"]) {
	process.on(event, () => {
		console.log(`Received ${event}, exiting. . .`);
		client.destroy();
		process.exit();
	});
}

client.login(process.env.TOKEN);
