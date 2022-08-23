const { MessageEmbed } = require("discord.js");
const { search } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(search)
    .setTitle("Queue empty :")
    .setDescription(`Queue is now empty!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
