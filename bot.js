require("dotenv").config();
const Discord = require('discord.js');
const fs = require('fs');
const { Collection } = require('discord.js')
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

bot.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		bot.on(event.name, (...args) => event.execute(...args, commands));
	}
}

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	setInterval(function() {
		let random = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		if (random == 1) {
			bot.user.setActivity("Enquêter");
			bot.user.setStatus('dnd');
		} else if (random == 2) {
			bot.user.setActivity("les lignes", { type: "LISTENING" });
			bot.user.setStatus('dnd');
		} else if (random == 3) {
			bot.user.setActivity("vos potins", { type: "LISTENING" });
			bot.user.setStatus('dnd');
		} else if (random == 4) {
			bot.user.setActivity("Recruter des agents");
			bot.user.setStatus('dnd');
		} else if (random == 5) {
			bot.user.setActivity("boucler des dossiers");
			bot.user.setStatus('dnd');
		} else if (random == 6) {
			bot.user.setActivity(`archiver les dossiers`);
			bot.user.setStatus('dnd');
		}
	}, 3600000);
});

bot.login(process.env.TOKEN);

