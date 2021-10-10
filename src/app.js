import { Client, Collection, Intents } from "discord.js";
import { prefix } from "./config.js";
import * as aggregated from "./helper/command-aggregator.js";
// import { responseEmbed } from "./helper/embed-builder.js";

const commands = new Collection();
Object.entries(aggregated).forEach(([commandName, command]) => {
	commands.set(commandName, command);
});

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	presence: {
		activities: [{
			name: ".\\help",
			type: "LISTENING"
		}]
	}
});

client.on("ready", (client) => {
	console.log(`client: ${client.user.username} ready!`);
});

client.on("messageCreate", (message) => {
	if (message.author.bot) return;

	const userId = new RegExp(`^<@!?${client.user.id}>$`);

	if (message.content.match(userId) !== null) {
		message.reply({
			content: `My prefix is \`${prefix}\``,
			allowedMentions: { repliedUser: false }
		});
	} else if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		// if (command === "help") {
		// 	const embed = responseEmbed()
		// 		.setTimestamp()
		// 		.setFooter("I Can (Not) Code");

		// 	if (args.length > 0) {
		// 		if (commands.has(args[0])) {
		// 			const res = commands.get(args[0]);
		// 			embed.setTitle(`\`${res.usage}\``)
		// 				.setDescription(res.description);
		// 		} else {
		// 			embed.setTitle("***404 Not Found***")
		// 				.setDescription("Use `.\\help` for complete list of commands");
		// 		}
		// 	} else {
		// 		embed.setTitle("***All supported commands***")
		// 			.setDescription(Array.from(commands.keys()).map(el => `\`${el}\``).join(", "));
		// 	}

		// 	message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		// }

		if (commands.has(command)) {
			try {
				commands.get(command).execute(message, args);
			} catch (error) {
				console.error(error);
				message.reply("There was an error executing that command!");
			}
		}
	}
});

["SIGTERM", "SIGINT"].forEach((event) => {
	process.on(event, () => {
		console.log(`node: ${event} received, exiting. . .`);
		client.destroy();
		process.exitCode = 0;
	});
});

client.login(process.env.TOKEN);
