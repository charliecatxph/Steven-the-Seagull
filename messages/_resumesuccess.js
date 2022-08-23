const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Resumed :")
    .setDescription(`Steven has resumed the player.`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });

  vc.send({ embeds: [message] });
};
