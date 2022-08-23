const { MessageEmbed } = require("discord.js");
const { fail } = require("./colors/_colors");

module.exports =  function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Play command fail :")
    .setDescription(`Please add tell me what to play. \`$play <song>\``)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
   vc.send({ embeds: [message] });
};
