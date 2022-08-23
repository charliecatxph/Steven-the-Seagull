const { MessageEmbed } = require("discord.js");
const { search } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(search)
    .setTitle("Skip success :")
    .setDescription(`The current song has been skipped!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
