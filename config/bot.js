export const trigger = ".\\loplep";
export const marker = "--";
const colours = [
	0xE4007F, 0xE2732D, 0x36B3DD, 0x8C9395, 0x1660A5, 0xF1C51F, 0xCC3554, 0x744791, 0x54AB48, 0xD54E8D,
	0x009FE8, 0xF0A20B, 0xE9A9E8, 0x13E8AE, 0xF23B4C, 0x49B9F9, 0x898989, 0xE6D617, 0xAE58EB, 0xFB75E4,
	0xFAB920, 0xEE879D, 0xFFE41C, 0x73C9F3, 0x565EA9, 0xF18F3D, 0xB44E8F, 0xE94C53, 0x8EC225, 0x9AA3AA, 0x39B184
];
function random(max) {
	return Math.floor(Math.random() * Math.floor(max))
}
export function createEmbed() {
	return {
		author: {
			name: "loplep-bot",
			iconURL: "https://lh3.googleusercontent.com/jtVjyLgtYTXbP4FBzPxWQAcc9PF6qRCMC13IOzefp5ei7ta87DXSha0ybbuOwQz5Qrc=s180",
			url: "https://github.com/ArinoJenynof/loplep-bot"
		},
		color: colours[random(colours.length)],
		timestamp: new Date()
	}
}