const { MessageEmbed } = require("discord.js");
const { play } = require("./colors/_colors");

module.exports = function (vc, param1, param2) {
  if (!param2) {
    const message = new MessageEmbed()
      .setColor(play)
      .setTitle("Playing :")
      .setAuthor({
        name: "🌊🐦 Steven the Seagull",
      })
      .setDescription(
        `${param1.join("\n")} \n \n *${param1.length} out of ${param1.length}*`
      );
    vc.send({ embeds: [message] });
  } else {
    const slicedQueue = param1.slice(0, 10);
    const message = new MessageEmbed()
      .setColor(play)
      .setTitle("Playing :")
      .setAuthor({
        name: "🌊🐦 Steven the Seagull",
      })
      .setDescription(
        `${slicedQueue.join("\n")} \n \n *${slicedQueue.length} out of ${
          param1.length
        }*`
      );
    vc.send({ embeds: [message] });
  }
};
