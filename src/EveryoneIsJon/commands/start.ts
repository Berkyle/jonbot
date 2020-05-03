import { Message } from 'discord.js';

import { GameState } from '../state';
import { reply } from '../../botUtils';

const start = (state: GameState, chatService: Message): true => {
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (Object.keys(state.players).length < 3) {
    chatService.reply('We need at least three people to play.');
  } else if (!state.john.playerId) {
    chatService.reply('We need someone to be John.');
  } else if (!state.john.playerId) {
    chatService.reply('We need someone to be John.');
  } else {
    let errors = '';
    let status = '';
    Object.values(state.players).forEach((player) => {
      if (player.isVoice) {
        if (!player.obsession?.description) {
          errors += `<@${player.id}> send me a DM with your obsession and its difficulty.\n`;
        } else if (!(player.obsession?.level && player.obsession?.level in [1, 2, 3])) {
          errors += `<@${player.id}> send me a DM with your obsession and its difficulty.\n`;
        }
        if (!(player.skills?.length && player.skills.length in [2, 3])) {
          errors += `<@${player.id}> send me a DM with your skills.\n`;
        }
      }
      status += `<@${player.id}> is ${player.isVoice ? `a voice named ${player.name}` : 'John'}.\n`;
    });
    if (errors.length) {
      chatService.reply(errors);
    } else {
      state.status = 'IN PROGRESS';
      state.phase = 'BIDDING';
      reply(chatService, [
        'Starting game...',
        status,
        'And now it\'s bidding time! Everyone bid for control of John by messaging me with your bid! ie: "<@!703401743857221665> bid 2"',
      ]);
    }
  }
  return true;
};

export default start;
