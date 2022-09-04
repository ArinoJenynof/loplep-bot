import { Client, GatewayIntentBits } from "discord.js";
import { predb } from "./commands/predb.js";
import { birthdays } from "./commands/birthdays.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = {
	[predb.data.name]: predb,
	[birthdays.data.name]: birthdays
};

client.once("ready", (client) => { console.log(`client: ${client.user.username} ready!`) });

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;
	try {
		await commands[commandName].execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "Error running slash command!", ephemeral: true });
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
