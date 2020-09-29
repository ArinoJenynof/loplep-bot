const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config/bot.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const command_files = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of command_files) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command_name = args.shift().toLowerCase();

	if (!client.commands.has(command_name))
		return;
	
	const command = client.commands.get(command_name);
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("There was an error trying to execute that command!");
	}
});

client.login(process.env.TOKEN);