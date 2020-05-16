import { Message } from 'discord.js';

import { GameState, Phase, PlayerType } from '../state';

interface KickOptions {
  isAfterDepletedWillpower?: boolean;
  isAfterFailedRoll?: boolean;
}

const defaultOptions = {
  isAfterDepletedWillpower: false,
  isAfterFailedRoll: false,
};

const kick = (state: GameState, chatService: Message, options: KickOptions = {}): true => {
  const { isAfterDepletedWillpower, isAfterFailedRoll } = Object.assign(defaultOptions, options);
  const currentJohnController = state.john.controlledBy;
  const authorId = chatService.author.id;

  let reply = state.players[currentJohnController].name; // preface by addressing the player controlling John.

  const authorIsJohn = authorId === state.john.playerId;
  const johnIsActive = state.phase === Phase.ACTIVE;

  if (isAfterDepletedWillpower) {
    reply += 'is out of willpower and';
  } else if (isAfterFailedRoll) {
    reply += 'failed their roll and';
  }
  if (isAfterDepletedWillpower || isAfterFailedRoll || (authorIsJohn && johnIsActive)) {
    if (currentJohnController) {
      reply += ' has lost control of John!';
      state.john.controlledBy = '';
      state.phase = Phase.BIDDING;

      const isRawKick = !(isAfterDepletedWillpower || isAfterFailedRoll);
      if (isRawKick) {
        reply += ' John has gone to sleep and voices will bid for control.';
        reply += ' All voices gain 1 willpower!';
        Object.values(state.players).forEach((player) => {
          if (player.playerType === PlayerType.VOICE) {
            player.willpower += 1;
          }
        });
      }
    } else {
      reply = 'Nobody is in control of John right now...';
    }
  } else {
    reply = 'Ha, sure pal.';
  }
  chatService.reply(reply);

  return true;
};

export default kick;
