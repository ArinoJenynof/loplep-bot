import https from "https";
import { MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { author, colours } from "../config.js";

const month = [
	"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

export default {
	data: new SlashCommandBuilder().setName("birthdays").setDescription("Show this month birthdays"),
	execute(interaction) {
		interaction.deferReply();
		https.get("https://loplep-hub.000webhostapp.com/api/characters/", (res) => {
			const { statusCode } = res;
			if (statusCode < 200 || statusCode > 299) {
				console.error(`birthdays: Request Failed (${statusCode})`);
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
					.setTitle(`***${month[new Date().getMonth()]} Birthdays***`)
					.setFooter("buon compleanno");

				const thisMonth = new Date().getUTCMonth();
				JSON.parse(rawData)
					.map((row) => {
						return {
							name: row.name,
							birthday: row.birthday.split("-").map(el => parseInt(el, 10)),
							idol_group: row.idol_group,
							profile_pic: row.profile_pic
						}
					})
					.filter(row => row.birthday[1] === (thisMonth + 1))
					.sort((a, b) => {
						switch(true) {
							case a.birthday[2] < b.birthday[2]:
								return -1;
							case a.birthday[2] > b.birthday[2]:
								return 1;
							default:
								return 0;
						}
					})
					.forEach((row) => {
						embed.addField(row.name, `${month[row.birthday[1] - 1]} ${row.birthday[2]}`);
				});

				interaction.editReply({ embeds: [embed] });
			});
		}).on("error", (err) => { console.error(err) });
	}
}
