module.exports = {
    name: "default",
    description: "default command",
    execute: (message, args) => {
        message.reply(`default command with args ${args}`);
    }
}