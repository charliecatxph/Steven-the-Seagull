const { success } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("About Me :")
    .setDescription(
      `Hi! I'm **Steven the Seagull**! I was made by a young developer with the codename **\`<charliecatxph/>\`** who really likes the **"Feeding Steven"** channel on YouTube! \n \n GitHub Link : https://github.com/charliecatxph \n Email : steventheseagull.bot@gmail.com \n \n Collaborators : **\`jellix_\`** \n \n Version : v1.8`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
