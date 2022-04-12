const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('archive')
        .setDescription('Déplace un channel dans la catégorie "📦 Archives"')
        .addStringOption(option => option.setName('name').setDescription('Nom du channel')),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        if (name) {
            const channel = interaction.guild.channels.cache.find(channel => channel.name === name);
            if (channel) {
                const category = interaction.guild.channels.cache.find(channel => channel.name === '📦 Archives');
                if (category) {
                    await channel.setName(`🔒${channel.name}`);
                    await channel.setParent(category.id);
                    return interaction.reply(`Le dossier ${name} a été archivé`);
                }
                return interaction.reply(`La catégorie "📦 Archives" n'a pas été trouvée`);
            }
            return interaction.reply(`Le channel ${name} n'a pas été trouvé`);
        }
    }
};
