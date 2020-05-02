import { Message } from 'discord.js';

import { GameState } from '../state';
import { reply } from '../../botUtils';

const start = (state: GameState, chatService: Message): true => {
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (Object.keys(state.players).length < 3) {
    chatService.reply('We need at least three people to play.');
  } else {
    /* #TODO Verify players have obsession, skills, correct willpower, and that one player is john */
    reply(chatService, [
      'Starting game...',
      'it\'s bidding time! Everyone bid for control of John by messaging me with your bid! ie: "<@!703401743857221665> bid 2"',
    ]);
    state.status = 'IN PROGRESS';
    state.phase = 'BIDDING';
  }
  return true;
};

export default start;
