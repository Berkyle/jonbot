import Discord from 'discord.js';

import state, { Status, PlayerType } from './state';

import init from './commands/init';
import help from './commands/help';
import register from './commands/register';
import unregister from './commands/unregister';
import obsession from './commands/obsession';
import skill from './commands/skill';
import start from './commands/start';
import bid from './commands/bid';
import finishBid from './commands/finishBid';
import roll from './commands/roll';
import kick from './commands/kick';
import status from './commands/status';
import { gameEndedMessage } from './gameUtils';

const checkForEIJCommands = (chatService: Discord.Message, message: string): boolean => {
  const commandParsableMessage = message.toLowerCase().replace(/[^a-z0-9]/g, '');

  console.log(`@Parsing for commands in "${message}".`);

  if (/^roll!?/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "roll"');
    return roll(state, chatService, message);
  }

  if (/^kick/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "kick"');
    return kick(state, chatService);
  }

  if (/^bid/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "bid"');
    return bid(state, chatService, message);
  }

  if (/^finishBid/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "finish bid"');
    return finishBid(state, chatService);
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

  if (/^help/i.exec(commandParsableMessage) && message.length < 10) {
    console.log('@Recognized command "help"');
    return help(chatService);
  }

  if (/^init/i.exec(commandParsableMessage)) {
    console.log('@Recognized command "init"');
    return init(state, chatService);
  }
  return false;
};

const checkForFinishedGame = (chatService: Discord.Message): void => {
  if (state.status === Status.IN_PROGRESS) {
    // The game is over when every voice player has 0 willpower.
    const players = Object.values(state.players);
    const gameFinished = players.every(
      (player) => player.playerType === PlayerType.JOHN || player.willpower <= 0,
    );

    if (gameFinished && !state.john.controlledBy) {
      let reply = gameEndedMessage();
      reply += '!';
      chatService.reply(reply);
    }
  }
};

export default (chatService: Discord.Message, message: string): boolean => {
  const commandsFound = checkForEIJCommands(chatService, message);
  if (commandsFound) {
    checkForFinishedGame(chatService);
  }
  return commandsFound;
};
