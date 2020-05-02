import { Message } from 'discord.js';

import { GameState } from '../state';
import { buildPlayer } from '../gameUtils';

const register = (state: GameState, chatService: Message, message: string): true => {
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (state.players[chatService.author.id]) {
    chatService.reply("Listen pal you're already in this game.");
  } else {
    const name = message.split(/register/i)[1];
    state.players[chatService.author.id] = buildPlayer(chatService.author.id, name);
    chatService.reply("You're in, now I need to know your obsession (see above).");
  }
  return true;
};

export default register;
