const { fail } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Seek fail :")
    .setDescription(
      `To seek, the numbers must be in the format : \`HH:MM:SS\`! \n \n For example if you want to seek to 01:30, you must type \`$seek 00:01:30\`!`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
