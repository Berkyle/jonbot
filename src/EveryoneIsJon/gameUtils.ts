import { Player } from './state';

export const rollD6 = (): number => Math.ceil(Math.random() * 6);

let initiative = 1000;

export const buildPlayer = (id: string, name: string, isJohn: boolean): Player => ({
  id,
  name,
  initiative: initiative--, // order by registration order
  isJohn,
  isVoice: !isJohn,
  obsession: { description: '', level: 1 }, // get after register
  skills: [], // get after obsession
  willpower: 10, // may be 7 later
  points: 0,
});
