const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc, param1) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Command fail :")
    .setDescription(
      `To use the command \`$${param1}\`, you and I must both be in the same voice channel first.`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
