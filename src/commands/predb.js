import https from "https";
import { MessageEmbed } from "discord.js";
import { author, colours } from "../config.js";

export default {
	name: "predb",
	description: "Fetch 10 latest releases from predb.ovh",
	usage: ".\\predb",

	/** @param {import("discord.js").Message} message */
	execute(message) {
		https.get("https://predb.ovh/api/v1/?q=@cat%20GAMES&count=10", (res) => {
			const { statusCode } = res;
			if (statusCode < 200 || statusCode > 299) {
				console.error(`predb: Request Failed (${statusCode})`);
				res.resume();
				return;
			}

			res.setEncoding("utf8");
			let rawData = "";
			res.on("data", (chunk) => { rawData += chunk });
			res.on("end", () => {
				const embed = new MessageEmbed()
					.setAuthor(...author)
					.setColor(colours[Math.floor(Math.random() * colours.length)])
					.setTimestamp()
					.setTitle("***Scene Release Database***")
					.setFooter("Data collected from predb.ovh");

				JSON.parse(rawData).data.rows.forEach((row) => {
					embed.addField(row.name, new Date(row.preAt * 1000).toISOString());
				});
				message.channel.send({ embeds: [embed] });
			});
		}).on("error", (err) => { console.error(err) });
	}
}
