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
  if (voiceChannel) {
    if (user === bot) {
      try {
        await distubeClient.previous(message);
      } catch (e) {
        emitMessage("NoLastSong", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
