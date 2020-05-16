import { Message } from 'discord.js';

import { GameState, Status, PlayerType, Phase } from '../state';

const finishCommand = '"<@!703401743857221665> finish bid"';

const checkBiddingComplete = (state: GameState, chatService: Message): void => {
  const bidCount = Object.values(state.bids).length;
  const voiceCount = Object.values(state.players).length - 1;
  if (bidCount === voiceCount) {
    chatService.reply(
      `That's all the bids we need, can you tell John to send ${finishCommand} in the server`,
    );
  }
};

const bid = (state: GameState, chatService: Message, message: string): true => {
  const authorId = chatService.author.id;
  const authorPlayer = state.players[authorId];

  if (state.status === Status.INACTIVE) {
    chatService.reply('There is no active game.');
  } else if (state.status === Status.FINISHED) {
    chatService.reply('The game is donezo.');
  } else if (state.status === Status.INITIALIZING) {
    chatService.reply("We're still setting up.");
  } else if (!authorPlayer) {
    chatService.reply("You're not eligible to bid here, punk.");
  } else if (state.phase !== Phase.BIDDING) {
    chatService.reply("We're not currently bidding for control of John.");
  } else if (authorPlayer.playerType === PlayerType.JOHN) {
    if (chatService.channel.type !== 'dm') {
      chatService.reply("Send me a DM and I'll tell you some secrets ;)");
    } else {
      // We are in a DM with the player that is John; let's show them the current bids
      const players = Object.values(state.players);
      const bids = state.bids;
      const bidSummary = players.reduce((summary, player) => {
        if (player.playerType === PlayerType.VOICE) {
          const playerBid = bids[player.id];
          const bidString = playerBid === null ? 'still waiting...' : playerBid;
          summary += `\n${player.name}'s bid: ${bidString}`;
        }
        return summary;
      }, '');

      let reply = `Here is a summary of who has bid so far: \n\n${bidSummary}\n\n`;
      reply += `If everyone has finished bidding, send ${finishCommand} in the server.`;
      chatService.reply(reply);
    }
  } else {
    let reply = '';
    const bidString = ('' + message.split(/bid/i).pop()).replace(/[^\d]*/g, '');
    const bidAmount = bidString.length ? +bidString : null;
    if (bidAmount === null || bidAmount < 0) {
      reply += 'No my dude, like this: "<@!703401743857221665> bid 3", or 0 or whatever';
    } else if (bidAmount > authorPlayer.willpower) {
      reply += "Haha okay but you don't even have that much willpower tho.";
    } else {
      if (chatService.channel.type !== 'dm') {
        reply += 'I mean you could have kept that a secret but okay, donezo.';
      }
      const oldBid = state.bids[authorId] || 0;
      authorPlayer.willpower = authorPlayer.willpower + oldBid - bidAmount;
      state.bids[authorId];
      chatService.author.send(`You have ${authorPlayer.willpower} willpower remaining.`);
    }
    chatService.reply(reply);
    checkBiddingComplete(state, chatService);
  }

  return true;
};

export default bid;
