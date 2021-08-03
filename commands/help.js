import { MessageEmbed } from "discord.js";
import { author, colours } from "../core/config.js";

const name = "help";
const description = "List all commands";
const usage = "help [<command>]";

/**
 * Send help
 * @param {import("discord.js").Message} message
 * @param {string} args
 */
function execute(message, args, globalData) {
	const { commands } = globalData;
	const embed = new MessageEmbed();
	embed.setAuthor(...author);
	embed.setColor(colours[Math.floor(Math.random() * colours.length)]);
	embed.setTimestamp();

	if (commands.has(args[0])) {
		const command = commands.get(args[0]);
		embed.setTitle(`\`${command.usage}\``);
		embed.setDescription(`${command.description}`);
	} else {
		embed.setTitle("**A simple Discord bot**");
		embed.setDescription(`Use \`.\\help [command]\` for detailed usage ^_^`);
		embed.addField("Commands", [...commands.keys()].map(el => `\`${el}\``).join(", "));
	}

	message.channel.send(embed).catch(console.error);
}

export default { name, description, usage, execute };
