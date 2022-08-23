const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Paused :")
    .setDescription(`Steven has paused the player.`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });

  vc.send({ embeds: [message] });
};
