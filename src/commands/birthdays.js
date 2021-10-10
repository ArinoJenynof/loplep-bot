import https from "https";
import { responseEmbed } from "../helper/embed-builder.js";

const month = [
	"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

export default {
	name: "birthdays",
	description: "Show this month birthdays",
	usage: ".\\birthdays",

	/** @param {import("discord.js").Message} message */
	execute(message) {
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
				const embed = responseEmbed()
					.setTimestamp()
					.setTitle(`***${month[new Date().getMonth()]} Birthdays***`)
					.setFooter("buon compleanno");

				const thisMonth = new Date().getUTCMonth();
				JSON.parse(rawData).forEach((row) => {
					const splitted = row.birthday.split("-");
					if (parseInt(splitted[1], 10) === (thisMonth + 1)) {
						embed.addField(row.name, `${month[splitted[1]]} ${splitted[2]}`);
					}
				});

				message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
			});
		}).on("error", (err) => { console.error(err) });
	}
}
