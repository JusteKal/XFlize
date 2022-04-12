const Discord = require('discord.js');

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		// member.guild.channels.cache.get("849283385808912384").send(`${member.user} has joined the server!`);

		const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("#d81e5b")
			.setTitle("Bye agent!!")
			.setDescription(`${member.user} a quitté les xflize, reste discret!`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get('952918568427749427').send({   
				embeds: [newMemberEmbed] 
			})
	}
}
