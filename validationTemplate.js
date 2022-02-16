if (message.guild.me.voice.channel) {
  if (message.member.voice.channelId === message.guild.me.voice.channelId) {
      // if everything is successfull, execute here


  } else {
    const connection_fail_not_in_vc = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Command fail :")
      .setDescription(
        `To use the command \`$play\`, you and I must both be in the same voice channel first.`
      )
      .setAuthor({ name: "🌊🐦 Steven the Seagull" });
    await message.channel.send({ embeds: [connection_fail_not_in_vc] });
  }
} else {
  const connection_fail_bot_in_vc = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Command fail :")
    .setDescription(`Add me to the voice channel using \`$join\`!`)
    .setAuthor({ name: "🌊🐦 Steven the Seagull" });
  await message.channel.send({ embeds: [connection_fail_bot_in_vc] });
}
