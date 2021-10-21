import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import commands from "./loader.js";

const deployed = Object.values(commands).map(command => command.data.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

const guilds = process.env.GUILD_ID.split(",");

guilds.forEach((guild) => {
	console.log(`client: deploying to ${guild}`);
	rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild), { body: deployed }).catch(console.error);
});
