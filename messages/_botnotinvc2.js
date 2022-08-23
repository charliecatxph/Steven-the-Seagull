const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Leave fail :")
    .setDescription(`I'm not even in a voice channel!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });

  vc.send({ embeds: [message] });
};
