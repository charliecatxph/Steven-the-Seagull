const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Repeat fail :")
    .setDescription(
      `Invalid repeat mode! \n \n \`DISABLED\` - 0 \n \`SONG\` - 1 \n \`QUEUE\` - 2 \n`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
