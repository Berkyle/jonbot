import { Message } from 'discord.js';

export const helpMessage = (): string => `
To do a command preface, your message with <@!703401743857221665>.

COMMANDS:
**__init__** - Begin game setup.
**__help__** - Show this help message if your fucking scroll button doesn't work for some reason.
**__register <character name>__** - Join the game. Do this like now if you're playing.
  Example: "<@!703401743857221665> register"
**__obsession <your voice's obsession>__** - 
**__start__** - Starts the game after setup is complete. Make sure every player has:
  1. Shared their obsession, sent me their skills, and shared

**__bid <willpower>__**: bid part of your remaining willpower. Remember you only have so much willpower.
  Example: "<@!703401743857221665> bid 2"
**__inquire <character name>__**: inquire about a 
**__status__** - I mansplain the current state of the game to you.

`;

export const help = (chatService: Message): true => {
  chatService.reply(helpMessage());
  return true;
};

export default help;
