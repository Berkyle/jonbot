import { Message } from 'discord.js';

export const helpMessage = (): string => `
To use a command, preface your message with <@!703401743857221665>.

COMMANDS:
**__init__** - Begin game setup.

**__help__** - Show this help message.

**__register <character name>__** - Join the game. To be used after *init* and before *start*.
  Example: "<@!703401743857221665> register John"
  Example: "<@!703401743857221665> register The Ghost of Richard Nixon"

**__obsession <obsession difficulty> <your voice's obsession>__** - What your voice wants John to do. The difficulty level is either 1, 2, or 3. Check the rules for more on this.
  Example: "<@!703401743857221665> obsession 2 Committing election fraud"

**__skill <skill 1>, <skill 2>(?, <skill 3>)__** - Your Voice's skills. Taking 3 skills means you start with 7 willpower.
  Example: "<@!703401743857221665> skill Public speaking, Wiretapping"

**__start__** - Starts the game after setup is complete. Make sure that:
  1. One player registered as John and every other player has registered as a voice.
  2. Every voice has sent me their obsession and their skills
  3. John is the one to start the game, in the channel that we started with "<@!703401743857221665> init"

**__bid <willpower>__**: bid part of your remaining willpower. Remember you only have so much per game.
  Example: "<@!703401743857221665> bid 2"

**__inquire <character name>__**: inquire about a 
**__status__** - I mansplain the current state of the game to you.

`;

export const help = (chatService: Message): true => {
  chatService.reply(helpMessage());
  return true;
};

export default help;
