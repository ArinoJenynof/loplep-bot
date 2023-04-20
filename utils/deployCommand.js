import { REST, Routes } from "discord.js";
import * as commandFiles from "./commandFiles.js";

const commands = [];
for (const command of Object.values(commandFiles)) {
	commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// for (const guildId of process.env.GUILD_ID.split(",")) {
		// 	await rest.put(
		// 		Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
		// 		{ body: [] }
		// 	);

		// 	const data = await rest.put(
		// 		Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
		// 		{ body: commands },
		// 	);
		// 	console.log(`Successfully reloaded ${data.length} application (/) commands into ${guildId}.`);
		// }
		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] });
		console.log("Successfully deleted all application commands.");
	} catch (error) {
		console.error(error);
	}
})();
