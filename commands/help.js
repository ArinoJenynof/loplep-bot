const { marker } = require("../config/bot.js");

module.exports = {
	name: "help",
	description: "Show this page",
	usage: "--help",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.client.commands.forEach((key, value) => {
			reply.push(`${marker}${value}\n\t${key.description}`);
		})
		message.channel.send(reply);
	}
}