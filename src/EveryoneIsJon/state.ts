type Status = 'INACTIVE' | 'INITIALIZING' | 'IN PROGRESS' | 'FINISHED';
type Phase = 'NOT IN PROGRESS' | 'BIDDING' | 'ACTIVE';

export interface GameState {
  status: Status;
  phase: Phase;
  players: {
    [type: string]: Player;
  };
  bids: Bid[];
}

export interface Player {
  id: string;
  name: string;
  initiative?: number;
  isJohn: boolean;
  isVoice: boolean;
  obsession: Obsession | null;
  points: number | null;
  skills: Skill[] | null;
  willpower: number; // <= 10, starts at 7 if skills.length === 3
}

export interface Voice extends Player {
  isJohn: false;
  isVoice: true;
  obsession: Obsession;
  points: number;
  skills: Skill[]; // length 2 or 3
}

export interface John extends Player {
  isJohn: true;
  isVoice: false;
  obsession: null;
  points: null;
}

export interface Skill {
  description: string;
}
export interface Obsession {
  description: string;
  level: 1 | 2 | 3;
}
export interface Bid {
  playerId: string;
  turn: number;
  willpower: number;
}

export const gameStates = [
  'initializing',
  'choosing jon',
  'choosing voices',
  'choosing skills',
  'test for control of jon',
];

const state: GameState = {
  status: 'INACTIVE',
  phase: 'NOT IN PROGRESS',
  players: {},
  bids: [],
};

export default state;
