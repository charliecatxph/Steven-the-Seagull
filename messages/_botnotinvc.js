const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Command fail :")
    .setDescription(`Add me to the voice channel using \`$join\`!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
