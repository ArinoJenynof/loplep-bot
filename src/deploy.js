import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";

import { predb } from "./commands/predb.js";
import { birthdays } from "./commands/birthdays.js"

const commands = [
	predb.data,
	birthdays.data
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

process.env.GUILD_ID.split(",").forEach(async (guildId) => {
	try {
		const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body: commands });
		console.log(`Registered ${data.length} commands to ${guildId}`);
	} catch (error) {
		console.error(error);
	}
});
