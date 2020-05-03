import { Message } from 'discord.js';

import { GameState } from '../state';

const obsession = (state: GameState, chatService: Message, message: string): true => {
  const commandBits = message.trim().split(/obsession /i);
  commandBits.shift();
  const difficulty = +commandBits[0].trim().substring(0, 1);
  const voiceObsession = commandBits[0].substring(1).trim();
  const authorId = chatService.author.id;
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (state.john.playerId === authorId) {
    chatService.reply("John doesn't need any skills or obsessions. You're good from here!");
  } else if (!state.players[authorId]) {
    chatService.reply("Doesn't look like you're in this game yet. Use the register command first.");
  } else if (!(difficulty in [1, 2, 3])) {
    chatService.reply(`
      How difficult is this obsession? Use the following format:\n
          <@!703401743857221665> obsession 1 Chilling
    `);
  } else if (!voiceObsession || voiceObsession.length < 1) {
    chatService.reply(`
      What's your obsession? Use the following format:\n
          <@!703401743857221665> obsession 2 Winning immense prestige among national dog shows
    `);
  } else {
    state.players[authorId].obsession = {
      description: voiceObsession,
      level: difficulty as 1 | 2 | 3,
    };
    chatService.reply(`
      You're now registered with the following obsession:
      ${voiceObsession} (difficulty: ${difficulty})
    `);
  }
  return true;
};

export default obsession;
