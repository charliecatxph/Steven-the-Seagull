const { fail } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Queue fail :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription("Queue is empty.");
  vc.send({ embeds: [message] });
};
