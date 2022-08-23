const emitMessage = require("../messages/index");

module.exports = function (
  sm,
  voiceChannel,
  user,
  bot,
  distubeClient,
  message,
  command,
  payload
) {
  if (bot) {
    if (user === bot) {
      const filter_set = [
        "bassboost",
        "echo",
        "karaoke",
        "nightcore",
        "vaporwave",
        "none",
      ];
      const queue = distubeClient.getQueue(message);
      if (queue !== undefined) {
        if (filter_set.includes(payload.join(" "))) {
          const set_filter = distubeClient.setFilter(
            message,
            payload[0] === "none" ? false : payload[0],
            true
          );
          emitMessage("FilterSuccess", sm, set_filter);
        } else {
          emitMessage("FilterFail", sm);
        }
      } else {
        emitMessage("FilterFailNoSongs", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
