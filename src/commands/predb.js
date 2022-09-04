import https from "https";
import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { author, colours } from "../info.js";

export const predb = {
	data: new SlashCommandBuilder().setName("predb").setDescription("Fetch 10 latest releases from predb.ovh"),

	execute(interaction) {
		interaction.deferReply();
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
				const embed = new EmbedBuilder()
					.setAuthor(author)
					.setColor(colours[Math.floor(Math.random() * colours.length)])
					.setTimestamp()
					.setTitle("***Scene Release Database***")
					.setFooter({ text: "Data collected from predb.ovh" });

				JSON.parse(rawData).data.rows.forEach((row) => {
					embed.addFields({ name: row.name, value: new Date(row.preAt * 1000).toISOString() });
				});
				interaction.editReply({ embeds: [embed] });
			});
		}).on("error", (err) => { console.error(err) });
	}
}
