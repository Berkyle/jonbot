import { Message } from 'discord.js';

import { GameState, PlayerType, Phase } from '../state';

const finishBid = (state: GameState, chatService: Message): true => {
  const authorId = chatService.author.id;
  const authorPlayer = state.players[authorId];

  const bids = Object.entries(state.bids);

  const isJohn = authorPlayer.playerType === PlayerType.JOHN;

  const bidCount = bids.length;
  const voiceCount = Object.values(state.players).length - 1;
  const readyToFinishBidding = bidCount === voiceCount;

  const isInCorrectServer = chatService.channel.id !== state.server.channelId;

  if (!isJohn) {
    chatService.reply("That's a John-only command, sorry pal 💅💅💅");
  } else if (!readyToFinishBidding) {
    chatService.reply('Not everyone has finished bidding yet.');
  } else if (!isInCorrectServer) {
    chatService.reply('Put that message where everyone can see it, AKA the correct channel.');
  } else {
    let reply = 'Here are the bids:\n';

    const highestBidders: string[] = [];
    let largestBidAmount = 0;

    reply += bids.reduce((bidsSummary, [id, _bid]) => {
      const bid = _bid || 0;
      const player = state.players[id];
      if (bid === largestBidAmount) {
        highestBidders.push(id);
      } else if (bid > largestBidAmount) {
        largestBidAmount = bid;
        highestBidders.length = 0;
        highestBidders.push(id);
      }

      bidsSummary += `\n    ${player.name} bid ${bid || 0}`;
      return bidsSummary;
    }, '');

    let winnerId = '';

    if (highestBidders.length > 1) {
      const randomIndex = Math.floor(Math.random() * highestBidders.length);
      winnerId = highestBidders.splice(randomIndex, 1)[0];
      reply += `\nIt's a tie! The randomly chosen winner is .... `;
    } else {
      winnerId = highestBidders[0];
      reply += `\nThe winner is ... `;
    }

    const highestBidder = state.players[winnerId];
    reply += `${highestBidder.name}!`;

    // Reset bids and non-winner willpower
    bids.forEach(([id, amount]) => {
      if (id !== winnerId) {
        state.players[id].willpower += amount || 0;
      }
    });
    reply += "\nIf you didn't win the bid, your bid cost zero willpower.";

    // Set correct game state
    state.phase = Phase.ACTIVE;
    state.john.controlledBy = winnerId;
    state.bids = {};

    chatService.reply(reply);
  }

  return true;
};

export default finishBid;
