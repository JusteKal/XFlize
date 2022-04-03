const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Creat Slash Command / Connection

module.exports = {
    data: new SlashCommandBuilder()
         .setName('embed')
         .setDescription('simple-embed'),
         async execute(interaction) {
	// Info / Embed
	const embed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(' Title ')
        .setURL('https://github.com/Pyr33x/Djs-v13-bot')
        .setAuthor( ' This s Author   ',' https://cdn.discordapp.com/attachments/844973689292193824/952965019119800320/0c001137084652d71854914b9637111b-modified.png ')
        .setDescription(' Description ', false)
        .addField('Im Field?', 'Yes')
        .setThumbnail('https://cdn.discordapp.com/attachments/844973689292193824/952965019119800320/0c001137084652d71854914b9637111b-modified.png')
        .setFooter(' Footer ', 'https://cdn.discordapp.com/attachments/844973689292193824/952965019119800320/0c001137084652d71854914b9637111b-modified.png');



		return interaction.reply({ embeds: [embed] });
	},
};