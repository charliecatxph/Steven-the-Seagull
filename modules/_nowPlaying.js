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
        const mapSong = queue.songs.map((d) => d.name);
        emitMessage("NowPlaying", sm, mapSong);
      } else {
        emitMessage("NowPlayingFail", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
