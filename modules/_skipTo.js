const emitMessage = require("../messages/index");

module.exports = async function (
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
      try {
        await distubeClient.jump(message, parseInt(payload));
      } catch (e) {
        emitMessage("SkipToFail", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
