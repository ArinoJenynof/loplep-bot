module.exports = {
	name: "yuu",
	description: "Yuu is standing",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		message.channel.send(reply, { files: ["./assets/yuu.png"] });
	}
}