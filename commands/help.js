import { marker, author, random, colours } from "../config/bot.js";
const reply = {}

export default {
	name: "help",
	description: "Show command's function",
	usage: "--help [command]",
	execute: (message, args) => {
		reply["color"] = colours[random(colours.length)];
		reply["author"] = author;
		if (message.client.commands.has(args[0])) {
			const command = message.client.commands.get(args[0]);
			reply["title"] = `\`${command.usage}\``;
			reply["description"] = `${command.description}`;
		} else {
			reply["title"] = "Supported Commands";
			reply["description"] = "Use `--help [command]` to know command's function ^_^\n\n";
			reply["description"] += [...message.client.commands.keys()].map(el => `\`${marker}${el}\``).join(", ");
		}
		message.channel.send(`${message.author}\n`, { embed: reply });
	}
}