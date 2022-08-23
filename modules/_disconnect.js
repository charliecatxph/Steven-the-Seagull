const emitMessage = require("../messages/index");

module.exports = async function (
  sm,
  voiceChannel,
  user,
  bot,
  distubeClient,
  message,
  command
) {
  if (bot) {
    if (user === bot) {
      try {
        await distubeClient.stop(message);
        await message.guild.me.voice.setChannel(null);
        emitMessage("LeaveSuccess", sm, voiceChannel);
      } catch (e) {
        await message.guild.me.voice.setChannel(null);
        emitMessage("LeaveSuccess", sm, voiceChannel);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc2", sm);
  }
};
