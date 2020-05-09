import Discord from 'discord.js';

import state from './state';
// import { rollD6 } from './gameUtils';

import init from './commands/init';
import help from './commands/help';
import register from './commands/register';
import unregister from './commands/unregister';
import obsession from './commands/obsession';
import skill from './commands/skill';
import start from './commands/start';
import status from './commands/status';

const checkForEIJCommands = (chatService: Discord.Message, message: string): boolean => {
  const commandParsableMessage = message.toLowerCase().replace(/[^a-z0-9]/g, '');

  console.log(`@Parsing for commands in "${message}".`);

  // if (/^attempt/i.exec(commandParsableMessage)) {
  //   console.log('@Recognized command "attempt"');
  //   const bid = /^attempt.*(\+\d+)?/i.exec(commandParsableMessage);
  //   const result = rollD6();
  //   const add = +bid[0].split(/\+/)[1] || 0;
  //   chatService.reply(`D6 result: ${result} +${add} = ${result + add}`);
  //   return true;
  // }
  if (/^roll/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "roll"');
    throw new Error('Unimplemented');
    return true;
  }

  if (/^test/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "test"');
    throw new Error('Unimplemented');
    return true;
  }

  if (/^bored/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "bored"');
    throw new Error('Unimplemented');
    return true;
  }

  if (/^bid/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "bid"');
    throw new Error('Unimplemented');
    return true;
  }

  if (/^status/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "status"');
    return status(state, chatService);
  }

  if (/^start/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "start"');
    return start(state, chatService);
  }

  if (/^obsession/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "obsession"');
    return obsession(state, chatService, message);
  }

  if (/^skills?/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "skills"');
    return skill(state, chatService, message);
  }

  if (/^unregister/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "unregister"');
    return unregister(state, chatService, message);
  }

  if (/^register/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "register"');
    return register(state, chatService, message);
  }

  if (/^help/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "help"');
    return help(chatService);
  }

  if (/^init/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "init"');
    return init(state, chatService);
  }
  return false;
};

export default checkForEIJCommands;
