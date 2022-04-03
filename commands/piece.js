// discord slash command qui fait pile ou face en aléatoire avec des gifs

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pileouface')
        .setDescription('Fait pile ou face'),
    async execute(interaction) {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            interaction.reply('Pile');
        } else {
            interaction.reply('Face');
        }
    }
};