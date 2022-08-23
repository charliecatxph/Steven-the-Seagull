const { MessageEmbed } = require("discord.js");
const { success } = require("./colors/_colors");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("Repeat mode success :")
    .setDescription(`Repeat mode has been set to : \`${param1}\`!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
