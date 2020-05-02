import { Player } from './state';

export const rollD6 = (): number => Math.ceil(Math.random() * 6);

export const buildPlayer = (id: string, name: string): Player => ({
  id,
  name,
  initiative: 0, // order by registration order
  isJohn: false, // probably, but one will be true
  isVoice: true, // probably, but one will be false
  obsession: { description: '', level: 1 }, // get after register
  points: 0,
  skills: [], // get after obsession
  willpower: 10, // may be 7 later
});
