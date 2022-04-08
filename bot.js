require("dotenv").config();
const Discord = require('discord.js');
const fs = require('fs');
const { Collection } = require('discord.js')
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.tag}!`);
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

bot.on('guildMemberAdd', guildMember => {
    guildMember.guild.channels.cache.get('952926518546419723').send(`:green_circle: Bienvenue chez les **XFlize, <@${guildMember.user.id}>!**`);
});

bot.on('guildMemberRemove', guildMember => {
	guildMember.guild.channels.cache.get('952926518546419723').send(`:red_circle: Bonne continuation, **<@${guildMember.user.id}>!**`);
});

// changement du jeu du bot de façon aléatoire dans une liste de jeux toutes les heures
bot.on('ready', () => {
	setInterval(function() {
		let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		if (random == 1) {
			bot.user.setActivity("enquêter");
			bot.user.setStatus('dnd');
		} else if (random == 2) {
			bot.user.setActivity("Sécuriser les lignes");
			bot.user.setStatus('dnd');
		} else if (random == 3) {
			bot.user.setActivity("Écouter vos potins");
			bot.user.setStatus('dnd');
		} else if (random == 4) {
			bot.user.setActivity("Recruter des agents");
			bot.user.setStatus('dnd');
		} else if (random == 5) {
			bot.user.setActivity("Boucler des dossiers");
			bot.user.setStatus('dnd');
		}
	}, 3600000);
});

bot.login(process.env.TOKEN);

