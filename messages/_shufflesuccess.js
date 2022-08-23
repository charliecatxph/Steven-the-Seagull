const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Shuffle success :")
    .setDescription(`Queue has been shuffled!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
