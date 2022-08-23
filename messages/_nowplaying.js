const { MessageEmbed } = require('discord.js');
const { play } = require("./colors/_colors");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(play)
    .setTitle("Now playing :")
    .setDescription(`${param1[0]}`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
