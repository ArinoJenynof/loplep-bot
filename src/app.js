import { Client, Collection, Intents } from "discord.js";
import commands from "./loader.js";

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	presence: {
		activities: [{
			name: "/help",
			type: "LISTENING"
		}]
	},
	allowedMentions: {
		repliedUser: false
	}
});

client.commands = new Collection();
Object.entries(commands).forEach(([commandName, commandObj]) => {
	client.commands.set(commandName, commandObj);
});

client.once("ready", (client) => {
	console.log(`client: ${client.user.username} ready!`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "There was an error executing that command!", ephemeral: true });
	}
});

["SIGTERM", "SIGINT"].forEach((event) => {
	process.on(event, () => {
		console.log(`node: ${event} received, exiting...`);
		client.destroy();
		process.exitCode = 0;
	});
});

client.login(process.env.TOKEN);
