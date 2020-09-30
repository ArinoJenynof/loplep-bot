module.exports = {
	name: "help",
	description: "Every command loplep-bot supports",
	usage: "--help",
	cooldown: 10,
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		reply.push("This is `loplep-bot` supported commands");
		reply.push("--help\n\tShow this help");
		reply.push("--today\n\tShow what happened today in LoveLive! history");
		message.channel.send(reply);
	}
}