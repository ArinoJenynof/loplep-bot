const { marker, message_embed, random, colours } = require("../config/bot.js");
const reply = Object.create(message_embed);

module.exports = {
	name: "help",
	description: "Show command's function",
	usage: "--help <?command>",
	execute: (message, args) => {
		reply["color"] = colours[random(colours.length)];
		if (message.client.commands.has(args[0])) {
			const command = message.client.commands.get(args[0]);
			reply["title"] = `\`${command.usage}\``;
			reply["description"] = `${command.description}`;
		} else {
			reply["title"] = "Supported Commands";
			reply["description"] = "Use `--help <command>` to know command's function ^_^\n\n";
			reply["description"] += [...message.client.commands.keys()].map(el => `\`${marker}${el}\``).join(", ");
		}
		message.channel.send(`${message.author}\n`, { message_embed: reply });
	}
}