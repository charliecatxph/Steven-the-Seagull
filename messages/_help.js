const { success } = require("./colors/_colors");
const { MessageEmbed } = require("discord.js");

module.exports = function (vc) {
  const message = new MessageEmbed()
    .setColor(success)
    .setTitle("About Me :")
    .setDescription(
      `\`$join\` - Joins the voice channel your currently in \n 
        \`$play <song/playlist>\` - Play a playlist or a song \n 
        \`$playLast\` - Plays the last song played, if there's one \n 
        \`$skip\` - Skips the current song \n 
        \`$leave\` - Leaves the voice channel \n 
        \`$queue\` - Displays the current queue \n 
        \`$resume\` - Resumes the player \n 
        \`$pause\` - Pauses the player \n
        \`$skipTo <number>\` - Skips to the song number that you want \n
        \`$repeatMode <number>\` - Sets the repeat mode \n
        \`$nowPlaying\` - Shows what's currently playing \n
        \`$seek\` - Seeks to a desired position in the song \n
        \`$shuffle\` - Shuffles the queue \n
        \`$lyrics\` - Gets the lyrics of the current song, if there's one \n
        \`$setFilter <filter>\` - Sets the queue sound filter \n
        \`$quote\` - Gives you a random quote cause' who doesn't like quotes right? \n
        \`$aboutMe\` - Shows information about the bot`
    )
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  vc.send({ embeds: [message] });
};
