import { Message } from 'discord.js';

export const helpMessage = (): string => `
To use a command, preface your message with <@!703401743857221665>.

example: "<@!703401743857221665> help" will run the help command, which prints this message.

**__SETUP COMMANDS__**
**init** - Begin game setup.
**register <character name>** - Join the game.
  Examples: "<@!703401743857221665> register John", "<@!703401743857221665> register The Ghost of Richard Nixon"
**unregister** - If you decide you don't want to play, use this.
**obsession <difficulty> <your obsession>** - Set your Voice's obsession
  Example: "<@!703401743857221665> obsession 2 Committing election fraud"
**skill <skill 1>, <skill 2>(?, <skill 3>)** - Set your Voice's skills
  Example: "<@!703401743857221665> skill Public speaking, Wiretapping"
**start** - Starts the game after setup is complete. 

**__IN-GAME COMMANDS__**
**bid <willpower>**: bid part of your remaining willpower. Remember you only have so much per game.
  Example: "<@!703401743857221665> bid 2"
**finish bid**: To be used by the player narrating John to end the bid period.
**roll (?+ <number>)**: Roll a d6, plus extra willpower if desired.
  Example: "<@!703401743857221665> roll + 3"
  Example: "<@!703401743857221665> roll"
  *Note*: Use "roll!" if your voice has a skill in this action.
**kick**: To be used by John when the voice controlling John is being boring.
**status** - I mansplain the current state of the game to you.
`;

export const help = (chatService: Message): true => {
  chatService.reply(helpMessage());
  return true;
};

export default help;
