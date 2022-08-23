const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Connection fail :")
    .setDescription(
      `To use the command \`$${param1}\`, you must be in a voice channel first.`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
