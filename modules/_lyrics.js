const songlyrics = require("songlyrics").default;
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
        try {
          songlyrics(mapSong[0])
            .then((lyrics) => {
              emitMessage("LyricsSuccess", sm, mapSong, lyrics);
            })
            .catch((e) => {
              emitMessage("LyricsFailNoLyrics", sm);
            });
        } catch (e) {
          emitMessage("LyricsFailFetch", sm);
        }
      } else {
        emitMessage("LyricsFailNoSongs", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
