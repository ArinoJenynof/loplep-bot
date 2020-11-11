import { createEmbed } from "../config/bot.js";
import axios from "axios";

export const command = {
	name: "predb",
	description: "Scene releases database",
	usage: "--predb [count]",
	execute: async (message, args) => {
		const embed = createEmbed();
		embed["title"] = "PC Releases Database";
		embed["fields"] = [];
		const count = args[0] || 20;
		const response = await axios.get(`https://predb.ovh/api/v1/?q=@cat%20GAMES-PC&count=${count}`);
		for (const row of response.data.data.rows) {
			embed["fields"].push({
				name: row["name"],
				value: new Date(row["preAt"] * 1000).toISOString()
			});
		}
		message.channel.send(`${message.author}`, { embed });
	}
}