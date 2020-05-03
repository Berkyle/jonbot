import { Message } from 'discord.js';

import { GameState } from '../state';

const skill = (state: GameState, chatService: Message, message: string): true => {
  const commandBits = message.trim().split(/skills? /i);
  commandBits.shift();
  const skills = commandBits.reduce((cmd, cmdBit) => cmd.concat(cmdBit)).split(/, ?/);
  const authorId = chatService.author.id;
  if (state.status !== 'INITIALIZING') {
    chatService.reply("Hey idiot we're not setting up right now, nice try.");
  } else if (state.john.playerId === authorId) {
    chatService.reply("John doesn't need any skills or obsessions. You're good from here!");
  } else if (!state.players[authorId]) {
    chatService.reply("Doesn't look like you're in this game yet. Use the register command first.");
  } else if (skills.length < 2) {
    chatService.reply(`
      You need at least two skills! Maybe you forgot commas? Use the following format:\n
          <@!703401743857221665> skill Civil War Re-enactments, Makes a mean carbonara
    `);
  } else if (skills.length > 3) {
    chatService.reply(`
      That's too many skills! Please choose two or three skills using the following format:\n
          <@!703401743857221665> skill Civil War Re-enactments, Makes a mean carbonara
    `);
  } else {
    state.players[authorId].skills = skills.map((description) => ({ description }));
    if (skills.length === 2) {
      state.players[authorId].willpower = 10;
    } else {
      state.players[authorId].willpower = 7;
      chatService.reply(`
        You're now registered with the following skills:
        ${skills.reduce((list, item, i) => list + `${i + 1}. ${item}\n`, `\n`)}
      `);
    }
  }
  return true;
};

export default skill;
