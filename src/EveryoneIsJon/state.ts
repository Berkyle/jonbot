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
export enum JohnState {
  INACTIVE,
  ACTIVE,
}

export interface GameState {
  status: Status;
  phase: Phase;
  players: {
    [playerId: string]: Player;
  };
  bids: Bid[];
  john: {
    playerId: string;
    controlledBy: string;
    state: JohnState;
  };
  server: {
    channelId: string;
  };
}

export interface PlayerBase {
  id: string;
  name: string;
  initiative: number;
  playerType: PlayerType;
  obsession: Obsession | null;
  skills: Skill[] | null;
  points: number | null;
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
  turn: number;
  willpower: number;
}

const state: GameState = {
  status: Status.INACTIVE,
  phase: Phase.NOT_PLAYING,
  players: {},
  bids: [],
  john: { playerId: '', controlledBy: '', state: JohnState.INACTIVE },
  server: {
    channelId: '',
  },
};

export default state;
