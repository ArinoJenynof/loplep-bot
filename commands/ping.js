import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const ping = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),

	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply("Pong!");
	}
}
