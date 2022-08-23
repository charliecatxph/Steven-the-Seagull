const emitMessage = require("../messages/index");

module.exports = function (
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
        const queueCheck = distubeClient.getQueue(message).playing;
        if (!queueCheck) {
          emitMessage("PauseFail", sm);
        } else {
          distubeClient.getQueue(message).pause();
          emitMessage("PauseSuccess", sm);
        }
      } catch (e) {
        emitMessage("PauseFailNoSongs", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
