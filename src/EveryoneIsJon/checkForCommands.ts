import Discord from 'discord.js';

import state from './state';
import { rollD6 } from './gameUtils';

import init from './commands/init';
import help from './commands/help';
import register from './commands/register';
import obsession from './commands/obsession';
import skill from './commands/skill';
import start from './commands/start';

const checkForEIJCommands = (chatService: Discord.Message, message: string): boolean => {
  const commandParsableMessage = message.toLowerCase().replace(/[^a-z0-9]/g, '');

  console.log(commandParsableMessage);

  const bid = /^bid.*(\+\d+)?/i.exec(commandParsableMessage);
  if (bid) {
    const result = rollD6();
    const add = +bid[0].split(/\+/)[1] || 0;
    chatService.reply(`D6 result: ${result} +${add} = ${result + add}`);
    return true;
  }

  if (/^start/i.exec(commandParsableMessage)) {
    return start(state, chatService);
  }

  if (/^obsession/i.exec(commandParsableMessage)) {
    return obsession(state, chatService, message);
  }

  if (/^skills?/i.exec(commandParsableMessage)) {
    return skill(state, chatService, message);
  }

  if (/^register/i.exec(commandParsableMessage)) {
    return register(state, chatService, message);
  }

  if (/^help/i.exec(commandParsableMessage)) {
    return help(chatService);
  }

  if (/^init/i.exec(commandParsableMessage)) {
    return init(state, chatService);
  }
  return false;
};

export default checkForEIJCommands;
