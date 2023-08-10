import puppeteer from "puppeteer";
import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";

const postId = /https?:\/\/1cak\.com\/(\d+)/;
const imgId = /https?:\/\/1cak\.com\/posts\/(\w+\.jpg)/;

export const wancak = {
	data: new SlashCommandBuilder()
		.setName("wancak")
		.setDescription("Get the image given a post URL")
		.addStringOption(
			option => option.setName("post_url").setDescription("The post URL where the image was posted").setRequired(true)
		),

	async execute(interaction) {
		await interaction.deferReply();

		const postUrl = interaction.options.getString("post_url");
		const postIdMatch = postUrl.match(postId);
		if (postIdMatch === null) {
			await interaction.editReply("mana ga ada");
		} else {
			const browser = await puppeteer.launch({ headless: "new" });
			const page = await browser.newPage();

			await page.goto(postIdMatch[0]);
			const imgUrl = await page.evaluate((postIdMatch) => {
				const el = document.querySelector(`#posts${postIdMatch[1]} img`);
				if (el) {
					return el.src;
				} else {
					return null;
				}
			}, postIdMatch);

			if (imgUrl === null) {
				return await interaction.editReply("mana ga ada");
			}

			const img = await page.goto(imgUrl);

			const imgName = imgUrl.match(imgId);
			const attach = new AttachmentBuilder(await img.buffer(), { name: imgName[1] });
			await interaction.editReply({ files: [attach] });
		}
	}
}