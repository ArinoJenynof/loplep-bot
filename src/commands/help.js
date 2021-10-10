import * as aggregated from "../helper/command-aggregator.js";
import { responseEmbed } from "../helper/embed-builder.js";

export default {
	name: "help",
	description: "Show available commands",
	usage: ".\\help [command]",

	/**
	 * @param {import("discord.js").Message} message
	 * @param {string[]} args
	 */
	execute(message, args) {
		if (Array.isArray(args) && args.length) {
			// if (Object.entries(aggregated).some(([key]) => key === args[0])) {
			// 	const command = commands.get(args[0]);
			// 	const embed = responseEmbed()
			// 		.setTimestamp()
			// 		.setFooter("I Can (Not) Code")
			// 		.setTitle(`${command.name}: \`${command.usage}\``)
			// 		.setDescription(`${command.description}`);

			// 	message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
			// } else {
			// 	message.reply({ content: "No such command!", allowedMentions: { repliedUser: false } });
			// }
			message.reply({ content: "Not implemented yet", allowedMentions: { repliedUser: false } });
		} else {
			const embed = responseEmbed().setTimestamp().setFooter("I Can (Not) Code").setTitle("***Commands list***");
			Object.entries(aggregated).forEach(([commandName, command]) => {
				embed.addField(`${commandName}\t\`${command.usage}\``, command.description);
			});
			message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		}
	}
}
