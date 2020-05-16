export enum Status {
  INACTIVE = 'Inactive',
  INITIALIZING = 'Initializing',
  IN_PROGRESS = 'In progress',
  FINISHED = 'Finished',
}
export enum Phase {
  NOT_PLAYING = 'Not playing',
  ACTIVE = 'Active',
  BIDDING = 'Bidding',
}
export enum PlayerType {
  JOHN,
  VOICE,
}

export interface GameState {
  status: Status;
  phase: Phase;
  players: {
    [playerId: string]: Player;
  };
  bids: {
    [playerId: string]: number | null;
  };
  john: {
    playerId: string;
    controlledBy: string;
  };
  server: {
    channelId: string;
  };
}

export interface PlayerBase {
  id: string;
  name: string;
  initiative: number; // didn't end up using this, really
  playerType: PlayerType;
  obsession: Obsession | null;
  skills: Skill[] | null;
  points: number | null; // points are completely subjective, who cares
  willpower: number; // <= 10, starts at 7 if skills.length === 3
}

export interface Voice extends PlayerBase {
  playerType: PlayerType.VOICE;
  obsession: Obsession;
  skills: Skill[]; // length 2 or 3
  points: number;
}

export interface John extends PlayerBase {
  playerType: PlayerType.JOHN;
  obsession: null;
  skills: null;
  points: null;
}

export type Player = John | Voice;

export interface Skill {
  description: string;
}
export interface Obsession {
  description: string;
  level: 1 | 2 | 3;
}
export interface Bid {
  playerId: string;
  willpower: number;
}

const state: GameState = {
  status: Status.INACTIVE,
  phase: Phase.NOT_PLAYING,
  players: {},
  bids: {},
  john: { playerId: '', controlledBy: '' },
  server: {
    channelId: '',
  },
};

export default state;
