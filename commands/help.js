module.exports = {
	name: "help",
	description: "Every command loplep-bot supports",
	usage: "--help",
	cooldown: 10,
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		reply.push("--today\tShow what happened today in LoveLive! history");
		message.channel.send(reply);
	}
}