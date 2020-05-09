import { Message } from 'discord.js';

import { GameState, Status, PlayerType } from '../state';

const skill = (state: GameState, chatService: Message, message: string): true => {
  const commandBits = message.trim().split(/skills? /i);
  commandBits.shift();
  const skills = commandBits.reduce((cmd, cmdBit) => cmd.concat(cmdBit)).split(/, ?/);
  const authorId = chatService.author.id;

  let reply = '';
  if (state.status !== Status.INITIALIZING) {
    reply += "Hey idiot we're not setting up right now, nice try.";
  } else if (!state.players[authorId]) {
    reply += "Doesn't look like you're in this game yet. Use the register command first.";
  } else if (chatService.channel.type !== 'dm') {
    reply += 'Uh.. Your skills are supposed to be secret so maybe send me that in a DM.';
  } else {
    const player = state.players[authorId];
    if (player.playerType === PlayerType.JOHN) {
      reply += "John doesn't need any skills or obsessions. You're good from here!";
    } else {
      if (skills.length < 2) {
        reply += `Choose more skills! Maybe you forgot commas? Use the following format:\n
              <@!703401743857221665> skill Civil War Re-enactments, Makes a mean carbonara`;
      } else if (skills.length > 3) {
        reply += `That's too many skills! Choose two or three skills using the following format:\n
              <@!703401743857221665> skill Encyclopedic knowledge of internet culture, Swallows`;
      }

      if (reply) {
        if (player.skills.length >= 2) {
          reply += "\n\nWe'll keep your old skills since you fucked that up so bad.";
        }
      } else {
        player.skills = skills.map((description) => ({ description }));
        reply += `You're now registered with the following skills:
            ${skills.reduce((list, item, i) => list + `${i + 1}. ${item}\n`, `\n`)}`;
        if (skills.length === 2) {
          player.willpower = 10;
          reply += 'Since you chose 2 skills, you will start with 10 willpower.\n\n';
        } else {
          player.willpower = 7;
          reply += 'Since you chose 3 skills, you will start with 7 willpower.\n\n';
        }

        if (player.obsession.description) {
          reply +=
            "Now that you have chosen an obsession and a skill, you're all set - Please wait for John to start the game.";
        }
      }
    }
  }
  chatService.reply(reply);
  return true;
};

export default skill;
