import { Client, Collection } from "discord.js";
import * as exported from "./core/exported.js";

const client = new Client({
	presence: {
		activity: {
			name: ".\\",
			type: "LISTENING"
		}
	}
});
const commands = new Collection();
const prefix = ".\\";
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const [key, value] of Object.entries(exported)) {
	commands.set(key, value);
}

// Client's event listener
client.once("ready", () => {
	console.log("[INFO] Bot ready!");
});

client.on("message", message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!commands.has(command)) return;

	commands.get(command).execute(message, args, { commands });
});

// Node process listener
// Windows sends SIGINT, heroku sends SIGTERM
["SIGINT", "SIGTERM"].forEach((event) => {
	process.on(event, () => {
		console.log(`[INFO] ${event} received, client destroyed`);
		client.destroy();
		process.exitCode = 0;
	});
});

client.login(process.env.TOKEN);
