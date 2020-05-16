import { Message } from 'discord.js';

import { GameState, Status, Phase, PlayerType } from '../state';
import { reply } from '../../botUtils';
import { bidHelpMessage, startHelpInstruction } from '../gameUtils';

const start = (state: GameState, chatService: Message): true => {
  if (state.status !== Status.INITIALIZING) {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (Object.keys(state.players).length < 3) {
    chatService.reply('We need at least three people to play.');
  } else if (!state.john.playerId) {
    chatService.reply('We need someone to be John.');
  } else if (chatService.channel.id !== state.server.channelId) {
    chatService.reply('Start the game in the channel it was initialized in pls.');
  } else if (chatService.author.id !== state.john.playerId) {
    chatService.reply('The game must be started by John.');
  } else {
    let errors = '';
    let summary = '';
    Object.values(state.players).forEach((player) => {
      if (player.playerType === PlayerType.VOICE) {
        if (!player.obsession.description) {
          errors += `<@${player.id}> send me a DM with your obsession and its difficulty.\n`;
        } else if (!(player.obsession.level && player.obsession.level in [1, 2, 3])) {
          errors += `<@${player.id}> send me a DM with your obsession and its difficulty.\n`;
        }
        if (!(player.skills.length && player.skills.length in [2, 3])) {
          errors += `<@${player.id}> send me a DM with your skills.\n`;
        }
      }
      const type = player.playerType === PlayerType.VOICE ? `a Voice named ${player.name}` : 'John';
      summary += `<@${player.id}> is ${type}.\n`;
    });
    if (errors.length) {
      const errorHelp = startHelpInstruction();
      chatService.reply(`${errors}\n${errorHelp}`);
    } else {
      state.status = Status.IN_PROGRESS;
      state.phase = Phase.BIDDING; // The game starts with a bid for control of John.
      reply(chatService, ['Starting game...', summary, bidHelpMessage()]);
    }
  }
  return true;
};

export default start;
