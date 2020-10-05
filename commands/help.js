const { marker } = require("../config/bot.js");
const embed = {
	color: 0x009FE8
};

module.exports = {
	name: "help",
	description: "Show this page",
	execute: (message, args) => {
		if (args[0] !== "help" && message.client.commands.has(args[0])) {
			const command = message.client.commands.get(args[0]);
			embed["description"] = `${command.description}`;
			embed["title"] = `\`${marker}${command.name}\``;
		} else {
			embed["description"] = [...message.client.commands.keys()].map(el => `\`${marker}${el}\``).join(", ");
			embed["title"] = "Supported Commands";
		}
		message.channel.send(`${message.author}\n`, { embed });
	}
}