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
      const queue = distubeClient.getQueue(message);
      if (queue !== undefined) {
        try {
          await distubeClient.shuffle(message);
          emitMessage("ShuffleSuccess", sm);
        } catch (e) {
          emitMessage("ShuffleFail", sm);
        }
      } else {
        emitMessage("ShuffleFailEmptyQueue", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
