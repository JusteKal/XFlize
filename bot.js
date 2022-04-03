const Discord = require('discord.js');
const { BOT_TOKEN  } = require('./config.json');
const fs = require('fs');
const { Collection } = require('discord.js')
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

// discord bot custom activity and status //
bot.on('messageCreate', message => {
    if (message.content === '!status') {
        bot.user.setActivity("enquêter");
        bot.user.setStatus('dnd');
        message.channel.send('Je suis en train de faire des enquêtes !');
    }
});


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

bot.on('ready,', () => {
    console.log('I am ready!');
    if (bot.user.presence.status === 'online') {
        bot.user.setActivity("enquêter");
        bot.user.setStatus('dnd');
    }
    console.log('error', console.error);
});

bot.login(BOT_TOKEN);

