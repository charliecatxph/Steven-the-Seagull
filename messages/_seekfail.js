const { fail } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Seek fail :")
    .setDescription(`Can't seek to the desired time!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
