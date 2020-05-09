import { Message } from 'discord.js';

import { GameState, Status } from '../state';

const unregisterPlayer = (state: GameState, id: string): string => {
  let reply = '';
  if (state.players[id]) {
    delete state.players[id];
    reply += 'Seeya, chump.';
    if (state.john.playerId === id) {
      state.john.playerId = '';
      reply += ' Also someone else needs to be John now.';
    }
  }
  return reply;
};

const unregister = (state: GameState, chatService: Message, message: string): true => {
  const idMatch = /\d{6,}/.exec(message.trim().split(/unregister /i)[1]);
  const id = idMatch && idMatch[0];
  const authorId = chatService.author.id;
  if (state.status !== Status.INITIALIZING) {
    chatService.reply("We're... not even registering? Bitch I'm gonna kill you.");
  } else if (!id || authorId !== '172158193416404992') {
    const maybeName = state.players[authorId] && state.players[authorId].name;
    const reply = unregisterPlayer(state, authorId);
    if (reply) {
      chatService.reply(`Unregistered ${maybeName}... ${reply}`);
    } else {
      chatService.reply(`Sorry, who are you? Beat it, pal.`);
    }
  } else if (authorId === '172158193416404992') {
    // I swear I'm not an asshole I just don't trust my own code.
    let reply = unregisterPlayer(state, id);
    if (reply) {
      reply += `Sheesh, get a load of this asshole. Anyway, ${reply}`;
    }
    chatService.reply(reply || 'Naw (AKA o god o fuk something broke)');
    console.log(`!Finished unregister procedure for id: "${id}"`);
  }
  return true;
};

export default unregister;
