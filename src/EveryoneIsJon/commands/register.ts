import { Message } from 'discord.js';

import { GameState } from '../state';
import { buildPlayer } from '../gameUtils';

const register = (state: GameState, chatService: Message, message: string): true => {
  const name = message.trim().split(/register /i)[1];
  const authorId = chatService.author.id;
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (!name) {
    chatService.reply(
      'That\'s great bud but what is your voice\'s name? Try again but more like: "<@!703401743857221665> register fat cock brock".',
    );
  } else {
    const isJohn = !!/^joh?n$/i.exec(name);
    let reply = '';
    if (isJohn) {
      if (state.john.playerId) {
        reply +=
          state.john.playerId !== authorId
            ? 'Someone is already John. If they agree to switch, they need to register as a different name first.'
            : "You're literally already John.";
      } else {
        reply += "You're John! Hold tight pal, I'll fill you in on more juicy details.";
        state.players[authorId] = buildPlayer(authorId, name, isJohn);
        state.john.playerId = authorId;
      }
    } else {
      reply +=
        "You're in, now I need to know your obsession. This is a secret, so shoot me a message privately ;^)";
      if (state.john.playerId === authorId) {
        reply += '\n\nSomeone else will now need to register as John.';
        state.john.playerId = '';
      }
      state.players[authorId] = buildPlayer(authorId, name, isJohn);
    }
    chatService.reply(reply);
  }
  return true;
};

export default register;
