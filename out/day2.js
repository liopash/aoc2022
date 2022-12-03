"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aocHelper_1 = require("./aocHelper");
const input = (0, aocHelper_1.inputReader)('day2.txt');
const tuples = (0, aocHelper_1.parseInput)(input);
// Opponent
const A = { name: 'ROCK', beats: 'SCISSORS', losesTo: 'PAPER', beatsCode: 'C', losesToCode: 'B', draws: 'A', value: 1 };
const B = { name: 'PAPER', beats: 'ROCK', losesTo: 'SCISSORS', beatsCode: 'A', losesToCode: 'C', draws: 'B', value: 2 };
const C = { name: 'SCISSORS', beats: 'PAPER', losesTo: 'ROCK', beatsCode: 'B', losesToCode: 'A', draws: 'C', value: 3 };
// You
const X = { name: 'ROCK', beats: 'SCISSORS', value: 1 };
const Y = { name: 'PAPER', beats: 'ROCK', value: 2 };
const Z = { name: 'SCISSORS', beats: 'PAPER', value: 3 };
const win = 6;
const lose = 0;
const draw = 3;
const mapper = {
    'A': A,
    'B': B,
    'C': C,
    'X': X,
    'Y': Y,
    'Z': Z
};
const getMove = ([o, u]) => {
    const you = mapper[u];
    const opponent = mapper[o];
    if (you.beats === opponent.name) {
        return win + you.value;
    }
    if (opponent.beats === you.name) {
        return lose + you.value;
    }
    return draw + you.value;
};
const opponentMapper = {
    'A': A,
    'B': B,
    'C': C
};
const actionMapper = {
    'X': 'beatsCode',
    'Y': 'draws',
    'Z': 'losesToCode'
};
const getMovePartTwo = ([o, u]) => {
    const opponent = opponentMapper[o];
    const mapperValue = actionMapper[u];
    const key = opponent[mapperValue];
    const you = opponentMapper[key];
    console.log(opponent, u, key, you);
    if (you.beats === opponent.name) {
        return win + you.value;
    }
    if (opponent.beats === you.name) {
        return lose + you.value;
    }
    return draw + you.value;
};
const result = tuples.map(getMove).reduce((a, b) => Number(a) + Number(b), 0);
const resultPartTwo = tuples.map(getMovePartTwo).reduce((a, b) => Number(a) + Number(b), 0);
for (const game of tuples) {
    console.log(getMove(game));
    console.log(getMovePartTwo(game));
}
console.log('SCORE:', result, 'GAMES', tuples.length);
console.log('SCORE:', resultPartTwo, 'GAMES', tuples.length);
