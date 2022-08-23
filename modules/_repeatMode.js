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
      if (distubeClient.getQueue(message) !== undefined) {
        try {
          if (parseInt(args) === 0) {
            distubeClient.setRepeatMode(message, 0);
            emitMessage("RepeatMode", sm, "DISABLED");
          } else if (parseInt(args) === 1) {
            distubeClient.setRepeatMode(message, 1);
            emitMessage("RepeatMode", sm, "SONG");
          } else if (parseInt(args) === 2) {
            distubeClient.setRepeatMode(message, 2);
            emitMessage("RepeatMode", sm, "QUEUE");
          } else {
            emitMessage("RepeatFailInvalid", sm);
          }
        } catch (e) {
          emitMessage("RepeatFailInvalid", sm);
        }
      } else {
        emitMessage("RepeatFailNoSongs", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
