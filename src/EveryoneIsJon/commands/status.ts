import { Message } from 'discord.js';

import { GameState, Status, Player, PlayerType } from '../state';
import { gameSummary, playerSummary } from '../gameUtils';

const status = (state: GameState, chatService: Message): true => {
  const authorId = chatService.author.id;
  const gameStateSummary = gameSummary(state);
  if (state.status === Status.INACTIVE) {
    chatService.reply('There is no active game.');
  } else if (state.status === Status.FINISHED) {
    chatService.reply('The game is donezo.');
  } else if (!state.players[authorId] || chatService.channel.type !== 'dm') {
    chatService.reply(gameStateSummary);
  } else if (chatService.channel.type === 'dm') {
    const authorPlayer = state.players[authorId];

    if (authorPlayer.playerType === PlayerType.JOHN) {
      const players = Object.values(state.players);
      const playersStats = players.reduce((message: string, player: Player) => {
        if (player.playerType !== PlayerType.JOHN) {
          message += playerSummary(player) + '\n';
        }
        return message;
      }, '');
      chatService.reply(playersStats);
    } else {
      const summary = `${gameSummary}\n\n${playerSummary(authorPlayer)}`;
      chatService.reply(summary);
    }
  }
  return true;
};

export default status;
