import { Message } from 'discord.js';

import { GameState } from '../state';
import { helpMessage } from './help';

const init = (state: GameState, chatService: Message): true => {
  if (state.status in ['INITIALIZING', 'IN PROGRESS']) {
    chatService.reply("Shut the fuck up mom I'm playing a game with my friends.");
  } else {
    chatService.reply('Ayo! Game time, time for game.\n' + helpMessage());
    state.status = 'INITIALIZING';
  }
  return true;
};

export default init;
// Some old ass init messages I will probably just delete later.

// const init0 = () => {
//   return `
//     I'm jonbot, Jon's robot attorney. You're all voices in my client's head, except for one of you.
//     Who should that be? Whoever it is reply by mentioning me (@jonbot) saying "I am John". The first
//     to reply gets it!
//   `;
// };

// const init1 = (user: string) => {
//   return `
//     Great, ${user} is my esteemed client, Jon! Everyone else will join as a voice in my client's
//     head. If that's you, please reply by mentioning me (again that's @jonbot ;D) with your voice's
//     name, like "@jonbot big yoshi".
//   `;
// };

// const init2 = () => {
//   return `
//     ezpz. Now, everyone needs to choose their skills. You can have 2 skills and start at 10
//     willpower, or 3 skills and start at 7 willpower.
//   `;
// };
