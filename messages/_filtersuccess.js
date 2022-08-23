const { success } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Filters set :")
    .setDescription(`Current filters : \`${param1.join(", ") || "Off"}\``)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
