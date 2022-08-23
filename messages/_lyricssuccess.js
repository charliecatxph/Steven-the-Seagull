const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc, param1, param2) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Lyrics :")
    .setDescription(`Lyrics for the song : ${param1[0]} \n \n ${param2.lyrics}`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
