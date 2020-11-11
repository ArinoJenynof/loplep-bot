import { marker, createEmbed } from "../config/bot.js";

export const command = {
	name: "help",
	description: "Show command usage",
	usage: "--help [command]",
	execute: (message, args) => {
		const embed = createEmbed();
		if (message.client.commands.has(args[0])) {
			const command = message.client.commands.get(args[0]);
			embed["title"] = `\`${command.usage}\``;
			embed["description"] = `${command.description}`;
		} else {
			embed["title"] = "**A simple Discord bot**";
			embed["description"] = "Use `--help [command]` for detailed usage ^_^";
			embed["fields"] = [
				{
					name: "Commands",
					value: [...message.client.commands.keys()].map(el => `\`${marker}${el}\``).join(", ")
				}
			];
		}
		message.channel.send(`${message.author}`, { embed });
	}
}