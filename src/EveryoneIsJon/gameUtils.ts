import { John, Voice, PlayerType, GameState, Player, Skill, Obsession } from './state';

export const rollD6 = (): number => Math.ceil(Math.random() * 6);

let initiative = 1000;

/**
 * PLAYER BUILDER UTILS
 */
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

export const playerNames = (players: Player[]): string => {
  return players
    .reduce((list, player) => {
      const add = player.playerType === PlayerType.VOICE ? `, ${player.name}` : '';
      return list + add;
    }, '')
    .substring(2);
};

/**
 * GAME AND PLAYER STATUS UTILS
 */
const obsessionSummary = (obsession: Obsession): string =>
  `${obsession.description} (difficulty: ${obsession.level})`;
const skillSummary = (skills: Skill[]): string =>
  `${skills.map((skill, i) => `  ${i + 1}. ${skill.description}`)}`;

export const playerSummary = (player: Voice): string => `
__**${player.name}**__:
**Willpower**: ${player.willpower}
**Obsession**: ${player.obsession.description ? obsessionSummary(player.obsession) : 'None yet'}
**Skills**: ${player.skills.length ? skillSummary(player.skills) : 'None yet'}`;

export const gameSummary = (state: GameState): string => `
**Game status**: ${state.status}
**Phase**: ${state.phase}
**Player controlling John**: ${state.players[state.john.controlledBy] || 'Nobody'}
**Players**: ${playerNames(Object.values(state.players)) || 'None yet'}
`;

/**
 * HELP AND ERROR MESSAGE UTILS
 */
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

export const registerJohnInstructions = (): string => `
Alright John, you'll be narrating your own life! Of course, you won't really be controlling it, just describing \
how you carry out the actions you take while another voice is in control. 

Here are some extra commands you'll need to know:

**__PRIVATE COMMANDS__** - commands you can message here for extra insight
**__status__** You'll get some extra insight into the game and your players if you use the status command here instead of \
in the server. This will include info on each player. Keep this info a secret, it's just to help you tell a better story!
**__bid__** You can use this command while Voices are bidding for control of John to see what everyone has bid so far. You can \
use this info to remind people to place a bid or bid 0 if they want to skip this round.

**__SERVER COMMANDS__** - commands that need to be used in the active channel
**__finish bid__**: When everyone has finished bidding (see the *bid* command above), determine who has won and continue play.
**__kick__**: If John gets bored, he goes to sleep and everyone gets 1 willpower. Use this command to trigger that event.
`;

export const startHelpInstruction = (): string => `
Before starting the game, make sure that:
  1. One player registered as John and every other player registered as a voice.
  2. Every voice has sent me their obsession and their skills
  3. John is the one to start the game, in the channel that we started with "<@!703401743857221665> init"
`;

export const registerErrorMessage = `That's great bud but what is your voice's name? Try something like:
      "<@!703401743857221665> register Fat Cock Brock"
Or, to be John, say "<@!703401743857221665> register John".`;

export const bidHelpMessage = (): string => `
It's time to bid for control of John! Everyone DM me (Jonbot!) with how much willpower you want \
to bid! If you don't want to bid, just bid 0!

Example: "<@!703401743857221665> bid 0"
`;

export const gameEndedMessage = (): string => `
The game is over! Points are totally arbitrary so I don't keep track of them but count 'em up! \
Points are calculated by multiplying your obsession difficulty by the number of times you achieved \
that obsession!
`;
