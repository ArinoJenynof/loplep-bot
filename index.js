import { Client, Events, GatewayIntentBits, ActivityType, Collection } from "discord.js";
import * as commandFiles from "./utils/commandFiles.js";

const commands = new Collection();
for (const command of Object.values(commandFiles)) {
	commands.set(command.data.name, command);
}

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	presence: {
		activities: [{ name: "this Server", type: ActivityType.Watching }]
	}
});

client.once(Events.ClientReady, client => {
	console.log(`client: ${client.user.tag} ready!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	try {
		await commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN);
