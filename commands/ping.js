// discord slash commang ping qui renvoie le temps de latence du bot

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie le temps de latence du bot'),
    async execute(interaction) {
        const ping = Math.abs(Date.now() - interaction.createdTimestamp);
        return interaction.reply(`Le temps de latence est de ${ping}ms`);
    }
};