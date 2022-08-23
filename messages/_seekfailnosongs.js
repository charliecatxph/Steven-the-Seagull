const { fail } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Seek fail :")
    .setDescription(`There are no songs in the queue!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
