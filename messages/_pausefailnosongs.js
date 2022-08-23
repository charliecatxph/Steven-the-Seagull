const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Pause fail :")
    .setDescription(
      `Steven can't pause the player. There are no songs in the queue.`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
