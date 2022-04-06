// a slash discord command that add a emote to the channel name //

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('archive')
        .setDescription('Ajoute un dossier aux archives')
        .addStringOption(option => option.setName('name').setDescription('Nom du salon'))
        .addStringOption(option => option.setName('emoji').setDescription('Nom de l\'emoji')),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const emoji = interaction.options.getString('emoji');
        if (name && emoji) {
            const channel = interaction.guild.channels.cache.find(channel => channel.name === name);
            if (channel) {
                await channel.setName(`${emoji}``${channel.name}`);
                // move the channel to the category "📦 Archives"//
                const category = interaction.guild.channels.cache.find(channel => channel.name === '📦 Archives');
                if (category) {
                await channel.setParent(category.id);
                return interaction.reply(`Le dossier ${name} a été archivé`);

            }
            return interaction.reply(`Le salon ${name} n'a pas été trouvé`);
        }
    }
}
};
 
