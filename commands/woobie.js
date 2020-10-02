const fs = require("fs");
const woobie_files = fs.readdirSync("./assets/woobie");

function random(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
	name: "woobie",
	description: "Send u a woobie on drugs pic",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.channel.send(reply, { files: [`./assets/woobie/${woobie_files[random(woobie_files.length)]}`] });
	}
}