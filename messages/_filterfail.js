const { fail } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(fail)
    .setTitle("Set filter fail :")
    .setDescription(
      `Please tell me what filter to set. \`$setFilter <filter>\` \n    
        \`bassboost\` - Sets a BassBoost filter to the queue \n
        \`echo\` - Sets an Echo filter to the queue \n
        \`karaoke\` - Sets a Karoke filter to the queue \n
        \`nightcore\` - Sets a Nightcore filter to the queue \n
        \`vaporwave\` - Sets a Lo-Fi filter to the queue \n
        \`none\` - Removes all the filters currently set
        `
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
