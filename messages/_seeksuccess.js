const { success } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Seek success :")
    .setDescription(`Seeked the song to \`${param1[0]}\`!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
