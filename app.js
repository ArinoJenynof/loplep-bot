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

	const submitTACountdown = () => {
		const guild = client.guilds.cache.get("730017966963425280");
		if (typeof guild === "undefined") return;
		const channel = guild.channels.cache.get("860002595678060554");
		if (typeof channel === "undefined") return;

		const now = new Date();
		const deadline = new Date(2021, 6, 9, 14);
		if (deadline.getTime() < now.getTime()) {
			return;
		} else if (deadline.getTime() - now.getTime() < 3.6e6) {
			channel.setName(`${deadline.getMinutes() - now.getMinutes()}menit-submit-ta`);
			setTimeout(submitTACountdown, (Math.ceil(Date.now() / 6e4) * 6e4));
		} else {
			channel.setName(`${deadline.getDate() - now.getDate()}hari${deadline.getHours() - now.getHours()}jam-submit-ta`);
			setTimeout(submitTACountdown, (Math.ceil(Date.now() / 3.6e6) * 3.6e6) - Date.now());
		}
	}
	setTimeout(submitTACountdown, (Math.ceil(Date.now() / 3.6e6) * 3.6e6) - Date.now());
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
