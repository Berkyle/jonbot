import { Message } from 'discord.js';

export const whatsYourFavoriteAnime = (message: string, chatService: Message): boolean => {
  const messageMatch = /what'?s your favorite anime/i.exec(message);
  if (messageMatch)
    chatService.reply(
      'As you know, the greatest anime ever created - Sword Art Online - leaves all "competitors" in the dust. Please, do not dirty my pristine robot anime mind with such silly whiims.',
    );
  return !!messageMatch;
};

export const myNameIsJeff = (message: string, chatService: Message): boolean => {
  const messageMatch = /i blame (the|da|teh) chef/i.exec(message);
  if (messageMatch) {
    chatService.reply('MY NAME IS JEFF');
  }
  return !!messageMatch;
};

export const weebAlert = (message: string, chatService: Message): boolean => {
  const isJuzer = chatService.author.id === '239570041576751104';
  const twoPercentChance = Math.floor(Math.random() * 50) === 25;
  if (isJuzer && twoPercentChance) {
    chatService.reply('Oh great, who let the weeb talk am I right?');
  }
  return isJuzer && twoPercentChance;
};

export const ema = (message: string, chatService: Message): boolean => {
  const messageMatch = /ema/.exec(message);
  if (messageMatch) chatService.reply('no u');
  return !!messageMatch;
};

const highPriority = [whatsYourFavoriteAnime, ema, myNameIsJeff];
const lowPriority = [weebAlert];

export const checkForJokes = (message: string, chatService: Message): boolean =>
  highPriority.concat(lowPriority).some((joke) => joke(message, chatService));
