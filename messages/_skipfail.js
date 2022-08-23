const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Skip fail :")
    .setDescription(`There's nothing to skip!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
