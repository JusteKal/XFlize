// a discord slash command that delete the number of messages specified in a channel

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Supprime le nombre de messages spécifié')
        .addStringOption(option => option.setName('number').setDescription('Nombre de messages à supprimer')),
    async execute(interaction) {
        const number = interaction.options.getString('number');
        if (number) {
            const channel = interaction.channel;
            if (channel) {
                const messages = await channel.messages.fetch({ limit: number });
                if (messages) {
                    await channel.bulkDelete(messages);
                    await interaction.reply(`${number} messages ont été supprimés`);
                    return interaction.deleteReply();
                }
                return interaction.bulkDelete('Il n\'y a pas de messages à supprimer');
            }
            return interaction.reply('Il n\'y a pas de salon de discussion');
        }
        return interaction.reply('Il n\'y a pas de nombre de messages à supprimer');
    }
};