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
      const queue = distubeClient.getQueue(message);
      if (queue !== undefined) {
        try {
          const matchTimeStamp = payload[0].match(
            /\d{1}\d{1}:{1}\d{1}\d{1}:{1}\d{1}\d{1}/g
          );
          if (matchTimeStamp !== null) {
            const sec = hmsToSecondsOnly(matchTimeStamp[0]);
            const getSongSec = queue.songs.map((d) => d.formattedDuration);
            const songSec = hmsToSecondsOnly(getSongSec[0]);
            function hmsToSecondsOnly(str) {
              var p = str.split(":"),
                s = 0,
                m = 1;
              while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
              }
              return s;
            }
            if (songSec >= sec) {
              distubeClient.seek(message, sec);
              emitMessage("SeekSuccess", sm, matchTimeStamp);
            } else {
              emitMessage("SeekFail", sm);
            }
          } else {
            emitMessage("SeekFailInvalidFormat", sm);
          }
        } catch (e) {
          emitMessage("SeekFailInvalidFormat", sm);
        }
      } else {
        emitMessage("SeekFailNoSongs", sm);
      }
    } else {
      emitMessage("NotSameVc", sm, command);
    }
  } else {
    emitMessage("BotNotInVc", sm);
  }
};
