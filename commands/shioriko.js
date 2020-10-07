module.exports = {
	name: "shioriko",
	description: "Cute Student Council President",
	usage: "--shioriko",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.channel.send(reply, { files: ["./assets/shioriko.jpg"] });
	}
}