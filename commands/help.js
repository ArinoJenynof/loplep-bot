const { marker } = require("../config/bot.js");

module.exports = {
	name: "help",
	description: "Show this page",
	usage: "--help",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.client.commands.forEach((command, command_name) => {
			reply.push(`${marker}${command_name}\n\t${command.description}`);
		})
		message.channel.send(reply);
	}
}