import { Message } from 'discord.js';

import { GameState, Status, Phase } from '../state';

const init = (state: GameState, chatService: Message): true => {
  if (![Status.INACTIVE, Status.FINISHED].includes(state.status)) {
    chatService.reply("Shut the fuck up mom I'm playing a game with my friends.");
  } else if (chatService.channel.type === 'dm') {
    chatService.reply(
      'Hey pal wanna maybe do this in a channel instead? You got friends? Wanna play a game with your friends? Yeah, beat it chump.',
    );
  } else {
    state.status = Status.INITIALIZING;
    state.phase = Phase.NOT_PLAYING;
    state.server.channelId = chatService.channel.id;

    chatService.reply(`
**Initialized a new game of Everyone is John!**
For a JonBot manual, say "<@!703401743857221665> help". For the rules to Everyone Is John, go to https://rulebook.io/games/everyone-is-john/rules.

**Next steps:**
- If you're playing, send the message "<@!703401743857221665> register <your character name>".
- One of you must be John. Whoever that is, reply with "<@!703401743857221665> register John".
`);
  }
  return true;
};

export default init;
