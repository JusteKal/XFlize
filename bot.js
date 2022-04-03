const Discord = require('discord.js');
const BOT_TOKEN = require ('./config.json');
const fs = require('fs');
const { Collection } = require('discord.js')
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

bot.on('ready', () => {
        bot.user.setActivity("enquêter");
        bot.user.setStatus('dnd');
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

bot.login(process.env.TOKEN);

