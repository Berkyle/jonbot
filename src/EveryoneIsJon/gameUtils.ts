import { John, Voice, PlayerType, GameState, Player } from './state';

export const rollD6 = (): number => Math.ceil(Math.random() * 6);

let initiative = 1000;

export const buildVoice = (id: string, name: string): Voice => ({
  id,
  name,
  initiative: initiative--, // order by registration order
  playerType: PlayerType.VOICE,
  obsession: { description: '', level: 1 }, // get after register
  skills: [], // get after register
  willpower: 10, // may be 7 later
  points: 0,
});

export const buildJohn = (id: string, name: string): John => ({
  id,
  name,
  initiative: initiative--, // order by registration order
  playerType: PlayerType.JOHN,
  obsession: null,
  skills: null,
  willpower: 0,
  points: null,
});

export const registerInstruction = (
  name: string,
): string => `Alright ${name}, now I need to know your Voice's obsession and skill. If you 
registered using something like:

      "<@!703401743857221665> register The Ghost of Richard Nixon"

... then you might want to reply to me here with:

      "<@!703401743857221665> obsession 2 Committing election fraud"
      "<@!703401743857221665> skill Public speaking, Wiretapping" 

This means you want John to commit election fraud as much as possible, which is an obsession with
a difficulty of 2 (you can choose 1, 2, or 3).

While trying to complete your obsession, John will have better luck succeeding at public speaking 
and wiretapping. If you pick two skills you start with 10 willpower, as opposed to 3 skills 
which would mean you start with 7 willpower.
`;

export const registerErrorMessage = `That's great bud but what is your voice's name? Try something like:
      "<@!703401743857221665> register Fat Cock Brock"
Or, to be John, say "<@!703401743857221665> register John".`;

export const playerNames = (players: Player[]): string => {
  return players
    .reduce((list, player) => {
      const add = player.playerType === PlayerType.VOICE ? `, ${player.name}` : '';
      return list + add;
    }, '')
    .substring(2);
};

export const gameSummary = (state: GameState): string => `
*Game status*: ${state.status}
*Phase*: ${state.phase}
*Player controlling John*: ${state.players[state.john.controlledBy]}
*Players*: ${playerNames(Object.values(state.players))}
`;

export const playerSummary = (player: Voice): string => `
__**${player.name}**__:
*Remaining willpower*: ${player.willpower}
*Obsession*:
  ${player.obsession.description} (difficulty: ${player.obsession.level})
*Skills*:
${player.skills.map((skill, i) => `  ${i + 1}. ${skill.description}`)}
`;
