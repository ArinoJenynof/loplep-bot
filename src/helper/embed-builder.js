import { MessageEmbed } from "discord.js";
import { author, colours } from "../config.js";

export const responseEmbed = () => new MessageEmbed().setAuthor(...author).setColor(colours[Math.floor(Math.random() * colours.length)]);
