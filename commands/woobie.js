import { readdirSync } from "fs";
import { random } from "../config/bot.js";

const gifs = readdirSync("./assets/woobie");

export default {
	name: "woobie",
	description: "Send u a woobie on drugs pic",
	usage: "--woobie",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.channel.send(reply, { files: [`./assets/woobie/${gifs[random(gifs.length)]}`] });
	}
}