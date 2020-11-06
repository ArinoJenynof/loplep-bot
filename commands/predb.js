import { author, random, colours } from "../config/bot.js";
import axios from "axios";

const reply = {};
reply["author"] = author;
reply["title"] = "PC Release Database";
reply["fields"] = [];

export const command = {
	name: "predb",
	description: "Scene releases database",
	usage: "--predb [?count]",
	execute: async (message, args) => {
		const count = args[0] || 20;
		const response = await axios.get(`https://predb.ovh/api/v1/?q=@cat%20GAMES-PC&count=${count}`);
		for (const row of response.data.data.rows) {
			reply["fields"].push({
				name: row["name"],
				value: new Date(row["preAt"] * 1000).toISOString()
			});
		}
		reply["color"] = colours[random(colours.length)];
		message.channel.send(`${message.author}`, { embed: reply });
	}
}