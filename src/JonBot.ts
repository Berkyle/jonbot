import * as Discord from 'discord.js';

import { botToken } from './config';
import { messageDoorman } from './botUtils';
import { checkForJokes } from './jokes';
import state from './EveryoneIsJon/state';
import checkForEIJCommands from './EveryoneIsJon/parseCommands';

const bot = new Discord.Client();

bot.on('ready', () => console.log("tight we're in there like swimwear."));

bot.on('message', (chatService) => {
  const message = messageDoorman(chatService);
  if (message === null) return;

  const hasEIJCommands = checkForEIJCommands(chatService, message);
  if (hasEIJCommands) {
    console.log(state);
    return;
  }

  const jokeFound = checkForJokes(message, chatService);
  if (jokeFound) return;

  chatService.reply(`man said "${message}.... also what's ligma"   LIGMA BALLZ . HA !!!  `);
  return;
});

// Login with token
bot.login(botToken);

export default bot;
