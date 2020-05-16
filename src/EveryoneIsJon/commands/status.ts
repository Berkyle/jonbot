import { Message } from 'discord.js';

import { GameState, Status, Player, PlayerType } from '../state';
import { gameSummary, playerSummary } from '../gameUtils';

const status = (state: GameState, chatService: Message): true => {
  const authorId = chatService.author.id;
  const authorPlayer = state.players[authorId];
  const gameStateSummary = gameSummary(state);
  if (state.status === Status.INACTIVE) {
    chatService.reply('There is no active game.');
  } else if (state.status === Status.FINISHED) {
    chatService.reply('The game is donezo.');
  } else if (!state.players[authorId] || chatService.channel.type !== 'dm') {
    chatService.reply(gameStateSummary);
  } else {
    // We know for sure we are in a DM with a player
    let summary = gameStateSummary;

    if (authorPlayer.playerType === PlayerType.JOHN) {
      const players = Object.values(state.players);
      summary += players.reduce((message: string, player: Player) => {
        if (player.playerType === PlayerType.VOICE) {
          message += `\n${playerSummary(player)}`;
        }
        return message;
      }, '');
      chatService.reply(summary);
    } else {
      summary = `${playerSummary(authorPlayer)}\n${summary}`;
      chatService.reply(summary);
    }
  }
  return true;
};

export default status;
