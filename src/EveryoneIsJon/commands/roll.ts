import { Message } from 'discord.js';

import { GameState, PlayerType } from '../state';
import { rollD6 } from '../gameUtils';
import kick from './kick';

const createRollReply = (
  isSkilledRoll: boolean,
  minimum: number,
  rollResult: number,
  mod: number,
  sum: number,
  rollSuccessful: boolean,
): string => `
${isSkilledRoll ? 'Skilled r' : 'R'}oll (need ${minimum}):  ${rollResult} + ${mod} = ${sum}
${rollSuccessful ? 'Roll failed!' : 'Success!'}
`;

const roll = (state: GameState, chatService: Message, message: string): true => {
  const authorId = chatService.author.id;

  const isSkilledRoll = Boolean(/roll!/i.exec(message));
  const minimum = isSkilledRoll ? 3 : 6;
  const maybeModifier = Number(message.split('+').pop());
  const mod = isNaN(maybeModifier) ? 0 : maybeModifier;
  const rollResult = rollD6();
  const sum = rollResult + mod;

  const rollSuccessful = sum < minimum;

  const player = state.players[authorId];

  const isVoice = player && player.playerType === PlayerType.VOICE;
  const isVoiceControllingJohn = isVoice && state.john.controlledBy == authorId;

  if (isVoiceControllingJohn) {
    if (player.willpower < mod) {
      chatService.reply("You don't have enough willpower for that. #EXPOSED");
      return true;
    } else {
      const reply = createRollReply(isSkilledRoll, minimum, rollResult, mod, sum, rollSuccessful);
      player.willpower -= mod;
      chatService.reply(reply);
      if (!rollSuccessful) {
        kick(state, chatService, { isAfterFailedRoll: true });
      } else {
        chatService.author.send(`You have ${player.willpower} willpower remaining`);
      }
    }
  } else {
    const rollReply = createRollReply(isSkilledRoll, minimum, rollResult, mod, sum, rollSuccessful);
    const reply = `Well you're not running John but here's what the result WOULD have been\n${rollReply}`;
    chatService.reply(reply);
  }

  return true;
};

export default roll;
