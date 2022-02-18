require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Quotes = require("randomquote-api");
const { joinVoiceChannel } = require("@discordjs/voice");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const songlyrics = require("songlyrics").default;

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ],
});
const config = {
  prefix: "$",
};

const distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emptyCooldown: 30,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
  youtubeDL: false,
});

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("need help? $help");
});

const color_success_play = "#1ABC9C";
const color_fail_pause_emptyQueue = "#E74C3C";
const color_search_skip = "#74B9FF";
const color_playing = "#FD79A8";

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.inGuild()) return;
  if (!message.content.startsWith(config.prefix)) return;
  const path = message.channel;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  const voiceChannel = message.member.voice.channel;

  if (command === "join") {
    if (voiceChannel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const connection_fail_already_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Connection fail :")
          .setDescription("We are already in the same voice channel!")
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await path.send({ embeds: [connection_fail_already_in_vc] });
      } else {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        const connection_success = new MessageEmbed()
          .setColor(color_success_play)
          .setTitle("Connection success :")
          .setDescription(`Connected to \`${voiceChannel.name}\` successfully!`)
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await path.send({ embeds: [connection_success] });
      }
    } else {
      const connection_fail_not_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Connection fail :")
        .setDescription(
          `To use the command \`$join\`, you must be in a voice channel first.`
        )
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_not_in_vc] });
    }
  }
  if (command === "play") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        if (args.length === 0) {
          const play_fail_no_song = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Play command fail :")
            .setDescription(`Please add tell me what to play. \`$play <song>\``)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [play_fail_no_song] });
        } else {
          const looking_for_song = new MessageEmbed()
            .setColor(color_search_skip)
            .setTitle("Searching :")
            .setDescription(
              `Steven is currently looking for the song/s you want!`
            )
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [looking_for_song] });
          await distube.play(voiceChannel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message,
          });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "playLast") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          await distube.previous(message);
        } catch (e) {
          const no_song_behind = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Play last fail :")
            .setDescription(`There is no song played previously!`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [no_song_behind] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "skip") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          const queue = distube.getQueue(message);
          if (queue.songs.length === 1) {
            await distube.stop(message);
            const empty_queue = new MessageEmbed()
              .setColor(color_search_skip)
              .setTitle("Queue empty :")
              .setDescription(`Queue is now empty!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [empty_queue] });
          } else {
            await distube.skip(message);
            const skip_success = new MessageEmbed()
              .setColor(color_search_skip)
              .setTitle("Skip success :")
              .setDescription(`The current song has been skipped!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [skip_success] });
          }
        } catch (e) {
          const skip_fail = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Skip fail :")
            .setDescription(`There's nothing to skip!`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [skip_fail] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "leave") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          const leave_embed = new MessageEmbed()
            .setColor(color_success_play)
            .setTitle("Leave command success :")
            .setDescription(`**I left \`${voiceChannel.name}\` successfully!**`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await distube.stop(message);
          await message.guild.me.voice.setChannel(null);
          await message.channel.send({ embeds: [leave_embed] });
        } catch (e) {
          const leave_embed = new MessageEmbed()
            .setColor(color_success_play)
            .setTitle("Leave command success :")
            .setDescription(`**I left \`${voiceChannel.name}\` successfully!**`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.guild.me.voice.setChannel(null);
          await message.channel.send({ embeds: [leave_embed] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$leave\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Leave fail :")
        .setDescription(`I'm not even in a voice channel!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "queue") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          const currentQueue = queue.songs.map(
            (data, index) =>
              `**${index + 1}. ${data.name} (${data.url}) - \`${
                data.formattedDuration
              }\`**`
          );
          if (currentQueue.length <= 10) {
            const queueList = new MessageEmbed()
              .setColor(color_playing)
              .setTitle("Playing :")
              .setAuthor({
                name: "🌊🐦 Steven the Seagull",
              })
              .setDescription(
                `${currentQueue.join("\n")} \n \n *${
                  currentQueue.length
                } out of ${currentQueue.length}*`
              );
            await message.channel.send({ embeds: [queueList] });
          } else {
            const slicedQueue = currentQueue.slice(0, 10);
            const queueList = new MessageEmbed()
              .setColor(color_playing)
              .setTitle("Playing :")
              .setAuthor({
                name: "🌊🐦 Steven the Seagull",
              })
              .setDescription(
                `${slicedQueue.join("\n")} \n \n *${
                  slicedQueue.length
                } out of ${currentQueue.length}*`
              );
            await message.channel.send({ embeds: [queueList] });
          }
        } else {
          const queueList = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Queue fail :")
            .setAuthor({
              name: "🌊🐦 Steven the Seagull",
            })
            .setDescription("Queue is empty.");
          await message.channel.send({ embeds: [queueList] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$queue\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "resume") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          const queueCheck = distube.getQueue(message).playing;
          if (queueCheck) {
            const playing_true = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Resume fail :")
              .setDescription(`The player is currently playing!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [playing_true] });
          } else {
            const playing_false = new MessageEmbed()
              .setColor(color_success_play)
              .setTitle("Resumed :")
              .setDescription(`Steven has resumed the player.`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            distube.getQueue(message).resume();
            await message.channel.send({ embeds: [playing_false] });
          }
        } catch (e) {
          const no_songs_on_list = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Resume fail :")
            .setDescription(
              `Steven can't resume the player. There are no songs in the queue.`
            )
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [no_songs_on_list] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$resume\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "pause") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          const queueCheck = distube.getQueue(message).playing;
          if (!queueCheck) {
            const playing_true = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Pause fail :")
              .setDescription(`The player is currently paused!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [playing_true] });
          } else {
            const playing_false = new MessageEmbed()
              .setColor(color_success_play)
              .setTitle("Paused :")
              .setDescription(`Steven has paused the player.`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            distube.getQueue(message).pause();
            await message.channel.send({ embeds: [playing_false] });
          }
        } catch (e) {
          const no_songs_on_list = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Pause fail :")
            .setDescription(
              `Steven can't pause the player. There are no songs in the queue.`
            )
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [no_songs_on_list] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$pause\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "skipTo") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        try {
          await distube.jump(message, parseInt(args));
        } catch (e) {
          const jump_fail = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Skip fail :")
            .setDescription(`Invalid song number. Can't skip!`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [jump_fail] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "repeatMode") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        if (distube.getQueue(message) !== undefined) {
          try {
            if (parseInt(args) === 0) {
              const set_repeat = new MessageEmbed()
                .setColor(color_success_play)
                .setTitle("Repeat mode success :")
                .setDescription(`Repeat mode has been set to : \`DISABLED\`!`)
                .setAuthor({ name: "🌊🐦 Steven the Seagull" });
              await message.channel.send({ embeds: [set_repeat] });
              distube.setRepeatMode(message, 0);
            } else if (parseInt(args) === 1) {
              const set_repeat = new MessageEmbed()
                .setColor(color_success_play)
                .setTitle("Repeat mode success :")
                .setDescription(`Repeat mode has been set to : \`SONG\`!`)
                .setAuthor({ name: "🌊🐦 Steven the Seagull" });
              await message.channel.send({ embeds: [set_repeat] });
              distube.setRepeatMode(message, 1);
            } else if (parseInt(args) === 2) {
              const set_repeat = new MessageEmbed()
                .setColor(color_success_play)
                .setTitle("Repeat mode success :")
                .setDescription(`Repeat mode has been set to : \`QUEUE\`!`)
                .setAuthor({ name: "🌊🐦 Steven the Seagull" });
              await message.channel.send({ embeds: [set_repeat] });
              distube.setRepeatMode(message, 2);
            } else {
              const invalid_repeat_mode = new MessageEmbed()
                .setColor(color_fail_pause_emptyQueue)
                .setTitle("Repeat fail :")
                .setDescription(
                  `Invalid repeat mode! \n \n \`DISABLED\` - 0 \n \`SONG\` - 1 \n \`QUEUE\` - 2 \n`
                )
                .setAuthor({ name: "🌊🐦 Steven the Seagull" });
              await message.channel.send({ embeds: [invalid_repeat_mode] });
            }
          } catch (e) {
            const invalid_repeat_mode = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Repeat fail :")
              .setDescription(
                `Invalid repeat mode! \n \n \`DISABLED\` - 0 \n \`SONG\` - 1 \n \`QUEUE\` - 2 \n`
              )
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [invalid_repeat_mode] });
          }
        } else {
          const no_queue = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Repeat fail :")
            .setDescription(
              `Repeat mode command won't work if there are no songs in the queue.`
            )
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [no_queue] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "nowPlaying") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          const mapSong = queue.songs.map((d) => d.name);
          const nowPlaying = new MessageEmbed()
            .setColor(color_playing)
            .setTitle("Now playing :")
            .setDescription(`${mapSong[0]}`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [nowPlaying] });
        } else {
          const nowPlaying = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Now playing command fail :")
            .setDescription(`There's nothing playing right now.`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [nowPlaying] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "seek") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          try {
            const matchTimeStamp = args[0].match(
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
                distube.seek(message, sec);
                const seek_success = new MessageEmbed()
                  .setColor(color_success_play)
                  .setTitle("Seek success :")
                  .setDescription(
                    `Seeked the song to \`${matchTimeStamp[0]}\`!`
                  )
                  .setAuthor({ name: "🌊🐦 Steven the Seagull" });
                await message.channel.send({ embeds: [seek_success] });
              } else {
                const cant_seek = new MessageEmbed()
                  .setColor(color_fail_pause_emptyQueue)
                  .setTitle("Seek fail :")
                  .setDescription(`Can't seek to the desired time!`)
                  .setAuthor({ name: "🌊🐦 Steven the Seagull" });
                await message.channel.send({ embeds: [cant_seek] });
              }
            } else {
              const not_in_proper_format = new MessageEmbed()
                .setColor(color_fail_pause_emptyQueue)
                .setTitle("Seek fail :")
                .setDescription(
                  `To seek, the numbers must be in the format : \`HH:MM:SS\`! \n \n For example if you want to seek to 01:30, you must type \`$seek 00:01:30\`!`
                )
                .setAuthor({ name: "🌊🐦 Steven the Seagull" });
              await message.channel.send({ embeds: [not_in_proper_format] });
            }
          } catch (e) {
            const not_in_proper_format = new MessageEmbed()
              .setColor("#FF0000")
              .setTitle("Seek fail :")
              .setDescription(
                `To seek, the numbers must be in the format : \`HH:MM:SS\`! \n \n For example if you want to seek to 01:30, you must type \`$seek 00:01:30\`!`
              )
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [not_in_proper_format] });
          }
        } else {
          const no_songs = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Seek fail :")
            .setDescription(`There are no songs in the queue!`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [no_songs] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "shuffle") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          try {
            await distube.shuffle(message);
            const shuffle_success = new MessageEmbed()
              .setColor(color_success_play)
              .setTitle("Shuffle success :")
              .setDescription(`Queue has been shuffled!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [shuffle_success] });
          } catch (e) {
            const shuffle_fail = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Shuffle fail :")
              .setDescription(`Shuffle fail!`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [shuffle_fail] });
          }
        } else {
          const shuffle_fail = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Shuffle fail :")
            .setDescription(`Can't shuffle! Queue is empty!`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [shuffle_fail] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "aboutMe") {
    const developer = new MessageEmbed()
      .setColor(color_success_play)
      .setTitle("About me :")
      .setDescription(
        `Hi! I'm **Steven the Seagull**! I was made by a young developer with the codename **\`<charliecatxph/>\`** who really likes the **"Feeding Steven"** channel on YouTube! \n \n GitHub Link : https://github.com/charliecatxph \n Email : steventheseagull.bot@gmail.com \n \n Collaborators : **\`jellix_\`** \n \n Version : v1.4`
      )
      .setAuthor({ name: "🌊🐦 Steven the Seagull" });
    await message.channel.send({ embeds: [developer] });
  }
  if (command === "help") {
    const help = new MessageEmbed()
      .setColor(color_success_play)
      .setTitle("My commands :")
      .setDescription(
        `\`$join\` - Joins the voice channel your currently in \n 
      \`$play <song/playlist>\` - Play a playlist or a song \n 
      \`$playLast\` - Plays the last song played, if there's one \n 
      \`$skip\` - Skips the current song \n 
      \`$leave\` - Leaves the voice channel \n 
      \`$queue\` - Displays the current queue \n 
      \`$resume\` - Resumes the player \n 
      \`$pause\` - Pauses the player \n
      \`$skipTo <number>\` - Skips to the song number that you want \n
      \`$repeatMode <number>\` - Sets the repeat mode \n
      \`$nowPlaying\` - Shows what's currently playing \n
      \`$seek\` - Seeks to a desired position in the song \n
      \`$shuffle\` - Shuffles the queue \n
      \`$lyrics\` - Gets the lyrics of the current song, if there's one \n
      \`$setFilter <filter>\` - Sets the queue sound filter \n
      \`$quote\` - Gives you a random quote cause' who doesn't like quotes right? \n
      \`$aboutMe\` - Shows information about the bot`
      )
      .setAuthor({ name: "🌊🐦 Steven the Seagull" });
    await message.channel.send({ embeds: [help] });
  }
  if (command === "lyrics") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          const mapSong = queue.songs.map((d) => d.name);
          try {
            const songLyrics = songlyrics(mapSong[0])
              .then((lyrics) => {
                const lyrics_embed = new MessageEmbed()
                  .setColor(color_playing)
                  .setTitle("Lyrics :")
                  .setDescription(
                    `Lyrics for the song : ${mapSong[0]} \n \n ${lyrics.lyrics}`
                  )
                  .setAuthor({ name: "🌊🐦 Steven the Seagull" });
                message.channel.send({ embeds: [lyrics_embed] });
              })
              .catch((e) => {
                const lyrics_fail_embed = new MessageEmbed()
                  .setColor(color_fail_pause_emptyQueue)
                  .setTitle("No lyrics :")
                  .setDescription(`No lyrics for the current song.`)
                  .setAuthor({ name: "🌊🐦 Steven the Seagull" });
                message.channel.send({ embeds: [lyrics_fail_embed] });
              });
          } catch (e) {
            const lyrics_fail_embed = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Lyric search fail :")
              .setDescription(`Error occured while finding song lyrics.`)
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            message.channel.send({ embeds: [lyrics_fail_embed] });
          }
        } else {
          const nowPlaying = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Lyrics command fail :")
            .setDescription(`There's nothing playing right now.`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [nowPlaying] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "setFilter") {
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channelId === message.guild.me.voice.channelId) {
        const filter_set = [
          "3d",
          "bassboost",
          "echo",
          "karaoke",
          "nightcore",
          "vaporwave",
          "none",
        ];
        const queue = distube.getQueue(message);
        if (queue !== undefined) {
          if (filter_set.includes(args.join(" "))) {
            const set_filter = distube.setFilter(
              message,
              args[0] === "none" ? false : args[0],
              true
            );
            const set_filter_success = new MessageEmbed()
              .setColor(color_success_play)
              .setTitle("Filters set :")
              .setDescription(
                `Current filters : \`${set_filter.join(", ") || "Off"}\``
              )
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [set_filter_success] });
          } else {
            const cant_set_filter = new MessageEmbed()
              .setColor(color_fail_pause_emptyQueue)
              .setTitle("Set filter fail :")
              .setDescription(
                `Please tell me what filter to set. \`$setFilter <filter>\` \n    
            \`bassboost\` - Sets a BassBoost filter to the queue \n
            \`echo\` - Sets an Echo filter to the queue \n
            \`karaoke\` - Sets a Karoke filter to the queue \n
            \`nightcore\` - Sets a Nightcore filter to the queue \n
            \`vaporwave\` - Sets a Lo-Fi filter to the queue \n
            \`none\` - Removes all the filters currently set
            `
              )
              .setAuthor({ name: "🌊🐦 Steven the Seagull" });
            await message.channel.send({ embeds: [cant_set_filter] });
          }
        } else {
          const cant_set_filter = new MessageEmbed()
            .setColor(color_fail_pause_emptyQueue)
            .setTitle("Set filter fail :")
            .setDescription(`Cannot set a filter when nothing is playing.`)
            .setAuthor({ name: "🌊🐦 Steven the Seagull" });
          await message.channel.send({ embeds: [cant_set_filter] });
        }
      } else {
        const connection_fail_not_in_vc = new MessageEmbed()
          .setColor(color_fail_pause_emptyQueue)
          .setTitle("Command fail :")
          .setDescription(
            `To use the command \`$play\`, you and I must both be in the same voice channel first.`
          )
          .setAuthor({ name: "🌊🐦 Steven the Seagull" });
        await message.channel.send({ embeds: [connection_fail_not_in_vc] });
      }
    } else {
      const connection_fail_bot_in_vc = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Command fail :")
        .setDescription(`Add me to the voice channel using \`$join\`!`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
    }
  }
  if (command === "quote") {
    try {
      const quoteReq = Quotes.randomQuote();
      const main_quote = quoteReq.quote;
      const author_quote = quoteReq.author;
      const quote_for_u = new MessageEmbed()
        .setColor(color_success_play)
        .setTitle("Quote :")
        .setDescription(`\"${main_quote}\" \n *- ${author_quote}*`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [quote_for_u] });
    } catch (e) {
      const quoteReq_fail = new MessageEmbed()
        .setColor(color_fail_pause_emptyQueue)
        .setTitle("Can't find quote right now :")
        .setDescription(`Steven can't find a quote right now.`)
        .setAuthor({ name: "🌊🐦 Steven the Seagull" });
      await message.channel.send({ embeds: [quoteReq_fail] });
    }
  }
});

distube.on("finish", async (queue) => {
  const queue_empty = new MessageEmbed()
    .setColor(color_playing)
    .setTitle("Queue is empty :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription("I left the voice channel! Queue is empty!");
  await queue.textChannel.send({ embeds: [queue_empty] });
});

distube.on("playSong", async (queue, song) => {
  const playSong = new MessageEmbed()
    .setColor(color_playing)
    .setTitle("Playing :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `${song.name} - \`${song.formattedDuration}\` \n \n Repeat Mode : \`${
        queue.repeatMode === 0
          ? "DISABLED"
          : queue.repeatMode === 1
          ? "SONG"
          : queue.repeatMode === 2
          ? "QUEUE"
          : undefined
      }\``
    );
  await queue.textChannel.send({ embeds: [playSong] });
});

distube.on("addSong", async (queue, song) => {
  const addSong = new MessageEmbed()
    .setColor(color_success_play)
    .setTitle("Added to the list :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `Added ${song.name} - ${song.formattedDuration} to the list!`
    );
  await queue.textChannel.send({ embeds: [addSong] });
});

distube.on("addList", async (queue, playlist) => {
  const addList = new MessageEmbed()
    .setColor(color_success_play)
    .setTitle("Added a playlist :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
    );
  await queue.textChannel.send({ embeds: [addList] });
});

distube.on("error", async (queue, error) => {
  try {
    await distube.stop(queue);
    await queue.guild.me.voice.setChannel(null);
  } catch (e) {
    await queue.guild.me.voice.setChannel(null);
    const error_embed = new MessageEmbed()
      .setColor(color_fail_pause_emptyQueue)
      .setTitle("Error :")
      .setAuthor({
        name: "🌊🐦 Steven the Seagull",
      })
      .setDescription("I encountered an error. I left the voice channel.");
    queue.send({ embeds: [error_embed] });
  }
});

distube.on("searchNoResult", async (queue) => {
  const no_result = new MessageEmbed()
    .setColor(color_fail_pause_emptyQueue)
    .setTitle("No result :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription("I can't find the song/s you wanted.");
  await queue.channel.send({ embeds: [no_result] });
});

distube.on("searchResult", () => {});
distube.on("searchCancel", () => {});
distube.on("searchInvalidAnswer", () => {});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (
    oldState.id === "943446885304266752" &&
    oldState.channelId === null &&
    newState.channelId !== null
  ) {
    return;
  }
  if (
    oldState.id === "943446885304266752" &&
    oldState.channelId !== null &&
    newState.channelId === null
  ) {
    try {
      await distube.stop(oldState);
      return;
    } catch (e) {
      return;
    }
  }
});

client.login(process.env.TOKEN);
