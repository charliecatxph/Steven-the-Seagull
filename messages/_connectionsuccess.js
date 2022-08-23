const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Connection success :")
    .setDescription(`Connected to \`${param1.name}\` successfully!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
