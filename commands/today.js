export default {
	name: "today",
	description: "Show what happened today in LoveLive! history",
	usage: "--today",
	execute: (message) => {
		const reply = [];
		reply.push(`${message.author}`);
		reply.push("**Today In History**");
		reply.push("<anggep ambil data dari DB>");
		message.channel.send(reply);
	}
}