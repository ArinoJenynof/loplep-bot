module.exports = {
    name: "woobie",
    description: "Send u a woobie on drugs pic",
    usage: "--woobie",
    execute: (message) => {
        const reply = [];
        reply.push(`${message.author}`);
        message.channel.send(reply, { files: ["./assets/woobie.jpg"] });
    }
}