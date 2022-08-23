const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Shuffle fail :")
    .setDescription(`Shuffle fail!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
