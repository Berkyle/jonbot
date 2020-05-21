import { Message as DiscordMessage, Message } from 'discord.js';
import { clientId } from './config';

export const messageDoorman = (chatService: DiscordMessage): null | string => {
  const authorIsJonbot = chatService.author.id === clientId;
  const jonbotIsMentioned = chatService.mentions.users.get(clientId);

  if (authorIsJonbot) {
    console.log(`!Ignoring my own message.`);
    return null;
  } else if (!jonbotIsMentioned) {
    console.log(`!Ignoring @jonbot-free message: ${chatService.content}`);
    return null;
  } else {
    console.log(`!Received: ${chatService.content}`);
  }

  const message = chatService.content.trim();
  const messageStripMention = message.replace(/.*<@!703401743857221665>/, '');

  return messageStripMention;
};

type Reply = Promise<Message>;
type ReplyCB = () => Reply;
export const reply = (chatService: DiscordMessage, replyContent: string | string[]): true => {
  if (typeof replyContent === 'string') {
    chatService.reply(replyContent);
  } else {
    // Turn each message into a callback that resolves to a reply Promise.
    const replyList = replyContent.map((message) => (): Reply => chatService.reply(message));

    // Send replies as a chain, waiting for one reply to fully resolve before sending the next.
    replyList
      .slice(1)
      .reduce(
        (replyChain: Reply, thenCallback: ReplyCB) => replyChain.then(thenCallback),
        replyList[0](),
      );
  }
  return true;
};
