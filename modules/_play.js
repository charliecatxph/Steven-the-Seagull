const ytMusic = require("node-youtube-music");
const emitMessage = require("../messages/index");
const urlCheck =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

function yt_music(payload) {
  return new Promise((resolve, reject) => {
    ytMusic.searchMusics(payload).then((d) => {
      try {
        resolve({
          link: "https://www.youtube.com/watch?v=" + d[0].youtubeId,
          title: d[0].title,
          album: d[0].album,
          duration: {
            formatted_duration: d[0].duration.label,
            duration: d[0].duration.totalSeconds,
          },
        });
      } catch (e) {
        reject("No song found.");
      }
    });
  });
}

const play = async (sm, voiceChannel, payload, distubeClient, message) => {
  const payload_parsed = payload.join(" ");
  if (payload.length === 0) {
    emitMessage("NoSongProvided", sm);
  } else {
    if (payload_parsed.match(urlCheck)) {
      emitMessage("General", sm, "Searching...");
      await distubeClient.play(voiceChannel, payload_parsed, {
        member: message.member,
        textChannel: message.channel,
        message,
      });
    } else {
      yt_music(payload_parsed)
        .then((d) => {
          emitMessage("General", sm, "Searching...");
          distubeClient.play(voiceChannel, d.link, {
            member: message.member,
            textChannel: message.channel,
            message,
          });
        })
        .catch((e) => {
          console.log(payload_parsed);
          emitMessage("NoSongFound", sm);
        });
    }
  }
};

module.exports = function (
  sm,
  voiceChannel,
  user,
  bot,
  client,
  song,
  message,
  command
) {
  if (voiceChannel) {
    if (bot) {
      if (user === bot) {
        play(sm, voiceChannel, song, client, message);
      } else {
        emitMessage("NotSameVc", sm, command);
      }
    } else {
      play(sm, voiceChannel, song, client, message);
    }
  } else {
    emitMessage("NoVc", sm, "play");
  }
};
