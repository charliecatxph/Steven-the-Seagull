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
        const queue = distubeClient.getQueue(message);
        if (queue.songs.length === 1) {
          await distubeClient.stop(message);
          emitMessage("EmptyQueue", sm);
        } else {
          await distubeClient.skip(message);
          emitMessage("SkipSuccess", sm);
        }
      } catch (e) {
        emitMessage("SkipFail", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
