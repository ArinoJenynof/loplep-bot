module.exports = {
	name: "help",
	description: "Every command loplep-bot supports",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		reply.push("--today\tShow what happened today in LoveLive! history");
		message.channel.send(reply);
	}
}