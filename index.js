// base requirements
require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Quotes = require("randomquote-api");
const { DisTube, Queue } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { OpusEncoder } = require("@discordjs/opus");
const en = require("javascript-time-ago/locale/en");
const TimeAgo = require("javascript-time-ago");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// commands
const joinCMD = require("./modules/_join");
const playCMD = require("./modules/_play");
const playLastCMD = require("./modules/_playLast");
const skipCMD = require("./modules/_skip");
const disconnectCMD = require("./modules/_disconnect");
const queueCMD = require("./modules/_queue");
const resumeCMD = require("./modules/_resume");
const pauseCMD = require("./modules/_pause");
const skipToCMD = require("./modules/_skipTo");
const repeatModeCMD = require("./modules/_repeatMode");
const nowPlayingCMD = require("./modules/_nowPlaying");
const seekCMD = require("./modules/_seek");
const shuffleCMD = require("./modules/_shuffle");
const lyricsCMD = require("./modules/_lyrics");
const filterCMD = require("./modules/_filter");
const emitMessage = require("./messages");

// discord client
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const config = {
  prefix: "$",
};

// distube client
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

const create_message = (type, color, title, desc) => {
  if (type === 1) {
    return new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .setAuthor({ name: "🌊🐦 Steven the Seagull" })
      .setDescription(desc);
  } else if (type === 2) {
    return new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: "🌊🐦 Steven the Seagull" })
      .setDescription(desc);
  } else {
  }
};

let time_since_dev;
client.on("ready", (client) => {
  if (process.env.MODE === "DEVELOPMENT") {
    time_since_dev = Date.now();
  }
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{ name: process.env.STATUS || "No Status" }],
  });

  client.user.setStatus(process.env.MODE === "DEVELOPMENT" ? "dnd" : "online");
});

const color_success_play = "#1ABC9C";
const color_fail_pause_emptyQueue = "#E74C3C";
const color_playing = "#FD79A8";

function inactiveEmbed() {
  return new MessageEmbed()
    .setColor(color_fail_pause_emptyQueue)
    .setTitle("I'm currently resting :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `Steven left you a note: \n \n Hey, Steven here. My owner currently put me in development mode. He's taking care of me and making me better! Sorry I can't be here with you right now but I'll be right back as soon as possible! \n \n - Steven \n \n Time since development mode: **${timeAgo.format(
        time_since_dev
      )}**`
    );
}

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.inGuild()) return;
  if (!message.content.startsWith(config.prefix)) return;

  const appMode = process.env.MODE;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // arguments after prefix
  const command = args.shift(); // command
  const sm = message.channel; // path where user sent message
  const user = message.member.voice.channelId; // user current channel ID :: nullable
  const voiceChannel = message.member.voice.channel; // user current channel props :: nullable
  const bot = message.guild.me.voice.channelId; // bot current channel ID :: nullable

  if (command === "join") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    joinCMD(sm, voiceChannel, user, bot);
  }
  if (command === "play" || command === "p") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    playCMD(sm, voiceChannel, user, bot, distube, args, message, command);
  }
  if (command === "playLast" || command === "pl") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    playLastCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "skip" || command === "s" || command === "next") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    skipCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "leave" || command === "dc" || command === "disconnect") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    disconnectCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "queue" || command === "q" || command === "list") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    queueCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "resume" || command === "rs") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    resumeCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "pause") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    pauseCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "skipTo" || command === "st") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    skipToCMD(sm, voiceChannel, user, bot, distube, message, command, args);
  }
  if (command === "repeatMode" || command === "rm") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    repeatModeCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "nowPlaying" || command === "np") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    nowPlayingCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "seek") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    seekCMD(sm, voiceChannel, user, bot, distube, message, command, args);
  }
  if (command === "shuffle" || command === "mix") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    shuffleCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "aboutMe") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    emitMessage("AboutMe", sm);
  }
  if (command === "help") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    emitMessage("Help", sm);
  }
  if (command === "lyrics" || command === "ly") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    lyricsCMD(sm, voiceChannel, user, bot, distube, message, command);
  }
  if (command === "setFilter" || command === "sf") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    filterCMD(sm, voiceChannel, user, bot, distube, message, command, args);
  }

  // extras (features)

  if (command === "quote") {
    if (appMode === "DEVELOPMENT") {
      message.channel.send({ embeds: [inactiveEmbed()] });
      return;
    }
    try {
      const quoteReq = Quotes.randomQuote();
      const main_quote = quoteReq.quote;
      const author_quote = quoteReq.author;
      await message.channel.send({
        embeds: [
          create_message(
            1,
            color_success_play,
            "Quote :",
            `\"${main_quote}\" \n *- ${author_quote}*`
          ),
        ],
      });
    } catch (e) {
      await message.channel.send({
        embeds: [
          create_message(
            1,
            color_fail_pause_emptyQueue,
            "Quote fail :",
            `Steven can't find a quote right now.`
          ),
        ],
      });
    }
  }
});

distube.on("empty", (m) => {
  m.textChannel.send({
    embeds: [
      create_message(
        1,
        color_success_play,
        '"Birds have feelings too, yk." :',
        `Why'd you leave me without saying goodbye?\nAnyway, I left the voice channel, have fun.`
      ),
    ],
  });
});

distube.on("finish", (queue) => {
  queue.textChannel.send({
    embeds: [
      create_message(
        1,
        color_success_play,
        "Finished :",
        `I left the voice channel. There are no more songs. Call me again using \`**$play**\`!.`
      ),
    ],
  });
});

distube.on("error", (channel, error) => {
  console.error(error);
});

distube.on("playSong", (queue, song) => {
  const playSong = new MessageEmbed()
    .setColor(color_playing)
    .setTitle("Playing :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `[${song.name}](${song.url}) - \`${
        song.formattedDuration
      }\` \n \n Repeat Mode : \`${
        queue.repeatMode === 0
          ? "DISABLED"
          : queue.repeatMode === 1
          ? "SONG"
          : queue.repeatMode === 2
          ? "QUEUE"
          : undefined
      }\``
    );
  queue.textChannel.send({ embeds: [playSong] });
});

distube.on("addSong", (queue, song) => {
  const addSong = new MessageEmbed()
    .setColor(color_success_play)
    .setTitle("Added to the list :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `💿 Added ${song.name} - \`${song.formattedDuration}\` to the list!`
    );
  queue.textChannel.send({ embeds: [addSong] });
});

distube.on("addList", (queue, playlist) => {
  const addList = new MessageEmbed()
    .setColor(color_success_play)
    .setTitle("Added a playlist :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription(
      `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
    );
  queue.textChannel.send({ embeds: [addList] });
});

distube.on("searchNoResult", (queue) => {
  const no_result = new MessageEmbed()
    .setColor(color_fail_pause_emptyQueue)
    .setTitle("No result :")
    .setAuthor({
      name: "🌊🐦 Steven the Seagull",
    })
    .setDescription("I can't find the song/s you wanted.");
  queue.channel.send({ embeds: [no_result] });
});

distube.on("searchResult", () => {});
distube.on("searchCancel", () => {});
distube.on("searchInvalidAnswer", () => {});

client.login(process.env.TOKEN);
