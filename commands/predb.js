import https from "https";
import { MessageEmbed } from "discord.js";
import { author, colours } from "../core/config.js";

const name = "predb";
const description = "PC Releases Database";
const usage = "predb";

/**
 * GET from predb.ovh API
 * @param {import("discord.js").Message} message 
 */
function execute(message) {
	https.get("https://predb.ovh/api/v1/?q=@cat%20GAMES-PC", (res) => {
		const { statusCode } = res;
		if (statusCode < 200 || statusCode > 299) {
			console.error(`Request Failed (${statusCode})`);
			res.resume();
			return;
		}

		res.setEncoding("utf8");
		let rawData = "";
		res.on("data", (chunk) => { rawData += chunk });
		res.on("end", () => {
			const embed = new MessageEmbed();
			embed.setAuthor(...author);
			embed.setColor(colours[Math.floor(Math.random() * colours.length)]);
			embed.setTimestamp();
			embed.setTitle("PC Releases Database");
			
			const parsedData = JSON.parse(rawData);
			for (const row of parsedData.data.rows) {
				embed.addField(row["name"], new Date(row["preAt"] * 1000).toISOString());
			}
			message.channel.send(embed).catch(console.error);
		});
	}).on("error", (err) => { console.error(err) });
}

export default { name, description, usage, execute };