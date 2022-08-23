const { joinVoiceChannel } = require("@discordjs/voice");
const emitMessage = require("../messages/index");

module.exports = function (sm, voiceChannel, user, bot) {
  if (voiceChannel) {
    if (user === bot) {
      emitMessage("SameVc", sm);
    } else {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
      emitMessage("ConnectionSuccess", sm, voiceChannel);
    }
  } else {
    emitMessage("NoVc", sm, "join");
  }
};
