import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const user = {
	data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),

	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	}
}
