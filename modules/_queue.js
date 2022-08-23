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
      const queue = distubeClient.getQueue(message);
      if (queue !== undefined) {
        const currentQueue = queue.songs.map(
          (data, index) =>
            `**${index + 1}. [${data.name}](${data.url}) - \`${
              data.formattedDuration
            }\`**`
        );
        if (currentQueue.length <= 10) {
          emitMessage("CurrentQueue", sm, currentQueue, false);
        } else {
          emitMessage("CurrentQueue", sm, currentQueue, true);
        }
      } else {
        emitMessage("EmptyQueueFail", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
