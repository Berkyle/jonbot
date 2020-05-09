import { Message } from 'discord.js';

import { GameState, Status, PlayerType } from '../state';

const obsession = (state: GameState, chatService: Message, message: string): true => {
  const commandBits = message.replace(/^[^(obsession)]*obsession /gi, '').trim();
  const difficulty = +commandBits.split(' ')[0];
  const voiceObsession = commandBits.substring(1).trim();
  const authorId = chatService.author.id;
  const player = state.players[authorId];
  if (state.status !== Status.INITIALIZING) {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (!state.players[authorId]) {
    chatService.reply("Doesn't look like you're in this game yet. Use the register command first.");
  } else if (player.playerType === PlayerType.JOHN) {
    chatService.reply("John doesn't need any skills or obsessions. You're good from here!");
  } else if (chatService.channel.type !== 'dm') {
    chatService.reply('Uh.. Your obsession should be secret; maybe send me that in a DM.');
  } else {
    let reply = '';
    if (![1, 2, 3].includes(difficulty)) {
      reply += `Use the following format (difficulty can be 1, 2, or 3):\n
            <@!703401743857221665> obsession 1 Chillin'`;
    } else if (!voiceObsession || voiceObsession.length < 1) {
      reply += `What's your obsession? Use the following format:\n
            <@!703401743857221665> obsession 2 Being awarded gold on reddit.com`;
    }

    if (reply) {
      if (player.obsession.description) {
        reply += "\n\nWe'll keep your old obsession since you fucked that up so bad.";
      }
    } else {
      player.obsession = {
        description: voiceObsession,
        level: difficulty as 1 | 2 | 3, // eh
      };
      reply += `You're now registered with the following obsession:
          ${voiceObsession} (difficulty: ${difficulty})`;

      if (player.skills.length) {
        reply +=
          "\n\nNow that you have chosen an obsession and a skill, you're all set! Wait for John to start the game!.";
      }
    }
    chatService.reply(reply);
  }
  return true;
};

export default obsession;
