// create a new text channel in the category "📦 dossiers en cours"//
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newcase')
        .setDescription('Crée un nouveau dossier')
        .addStringOption(option => option.setName('name').setDescription('Nom du dossier')),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        if (name) {
            const category = interaction.guild.channels.cache.find(channel => channel.name === '📚 Dossiers en cours');
            if (category) {
                const channel = await interaction.guild.channels.create(name, { type: 'text', parent: category.id });
                return interaction.reply(`Le dossier ${name} a été créé`);
            }
            return interaction.reply(`Le salon ${name} n'a pas été trouvé`);
        }
    }
};


