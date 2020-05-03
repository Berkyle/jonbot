import { Message } from 'discord.js';

import { GameState } from '../state';

const init = (state: GameState, chatService: Message): true => {
  if (state.status in ['INITIALIZING', 'IN PROGRESS']) {
    chatService.reply("Shut the fuck up mom I'm playing a game with my friends.");
  } else {
    chatService.reply(`
Ayo! Game time, time for game.

For a quick manual, say "<@!703401743857221665> help".

Everyone who is playing, please send the message "<@!703401743857221665> register *__your character name__*".
Remember, we need one of you to be John so that person should reply with "<@!703401743857221665> register John".
Everyone not registering as John will be a Voice. After a Voice registers, they should send a private message to \
me (Jonbot!) sharing their obsession, and then sharing their skills. This will look like
    In the server: 
    "<@!703401743857221665> register The Ghost of Richard Nixon"
    Privately to JonBot:
    "<@!703401743857221665> obsession 2 Committing election fraud"
    "<@!703401743857221665> skill Public speaking, Wiretapping"
`);
    state.status = 'INITIALIZING';
    state.phase = 'NOT IN PROGRESS';
  }
  return true;
};

export default init;
