const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Connection fail :")
    .setDescription("We are already in the same voice channel!")
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });

  vc.send({ embeds: [message] });
};
