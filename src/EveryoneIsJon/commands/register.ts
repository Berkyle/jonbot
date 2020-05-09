import { Message } from 'discord.js';

import { GameState, Status } from '../state';
import { buildVoice, buildJohn, registerInstruction, registerErrorMessage } from '../gameUtils';

const register = (state: GameState, chatService: Message, message: string): true => {
  const name = message.trim().split(/register /i)[1];
  const authorId = chatService.author.id;
  if (state.status !== Status.INITIALIZING) {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (chatService.channel.id !== state.server.channelId) {
    chatService.reply('All players need to know your name! Register in the original channel.');
  } else if (!name) {
    chatService.reply(registerErrorMessage);
  } else {
    let reply = '';
    const isJohn = !!/^joh?n$/i.exec(name);
    console.log(`@Recognized name "${name}" as ${isJohn ? 'John' : 'Voice'}`);

    if (isJohn) {
      if (state.john.playerId) {
        reply +=
          state.john.playerId !== authorId
            ? 'Someone is already John. If they agree to switch, they need to register as a different name first.'
            : "he's literally the guy in the pic";
      } else {
        reply += "You're John! Hold tight pal, I'll fill you in on more juicy details.";
        state.players[authorId] = buildJohn(authorId, name);
        state.john.playerId = authorId;
      }
    } else {
      reply +=
        "You're in, now I need to know your obsession. This is a secret, so shoot me a message privately ;^) ";
      if (state.john.playerId === authorId) {
        reply += '\n\nSomeone else will now need to register as John.';
        state.john.playerId = '';
      }
      state.players[authorId] = buildVoice(authorId, name);
      chatService.author.send(registerInstruction(name));
    }
    chatService.reply(reply);
  }
  return true;
};

export default register;
