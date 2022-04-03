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

// une commande pour créer un salon textuel //
bot.on('messageCreate', message => {
    if (message.content === '!nc') {
        const proute = message.content.split(' ') [1];
        if (proute) {
            message.guild.channels.create(proute, { type: 'text' }).then(channel => console.log(`Created new channel ${channel}`));
            message.channel.send(`Le salon ${proute} a été créé`);
        } else {
            message.channel.send('Vous devez préciser un nom de salon');
        }
    }
});

// commande pour modifier le nom d'un salon existant //
bot.on('messageCreate', message => {
    if (message.content === '!mc') {
        const proute = message.content.split(' ') [1];
        const nroute = message.content.split(' ') [2];
        if (proute && nroute) {
            message.guild.channels.cache.find(channel => channel.name === proute).setName(nroute);
            message.channel.send(`Le salon ${proute} a été renommé en ${nroute}`);
        } else {
            message.channel.send('Vous devez préciser un nom de salon et un nouveau nom de salon');
        }
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
    bot.user.setActivity("enquêter");
    console.log('error', console.error);
});

bot.login(BOT_TOKEN);

