const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newcase')
        .setDescription('Créée un dossier')
        .addStringOption(option => option.setName('name').setDescription('Nom du dossier')),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        if (name) {
            await interaction.guild.channels.create(name, { type: 'text' }).then(channel => console.log(`Created new channel ${channel}`));
            const channel = interaction.guild.channels.cache.find(channel => channel.name === name);
            if (channel) {
            const category = interaction.guild.channels.cache.find(channel => channel.name === '📚 Dossiers en cours');
            if (category) {
                await channel.setParent(category.id);
                return interaction.reply(`Le salon ${name} a été créé dans la catégorie Enquêtes`);
        }
            return interaction.reply('La catégorie Archives n\'a pas été trouvée');
        }
        return interaction.reply('Le nom que tu veux donner à ton salon est pas valide');
    }
    },
};