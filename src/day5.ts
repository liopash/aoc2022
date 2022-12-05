import { inputReader, parseInput } from './aocHelper'

const input = inputReader('./day5.txt')

// `
// [J]             [F] [M]
// [Z] [F]     [G] [Q] [F]
// [G] [P]     [H] [Z] [S] [Q]
// [V] [W] [Z] [P] [D] [G] [P]
// [T] [D] [S] [Z] [N] [W] [B] [N]
// [D] [M] [R] [J] [J] [P] [V] [P] [J]
// [B] [R] [C] [T] [C] [V] [C] [B] [P]
// [N] [S] [V] [R] [T] [N] [G] [Z] [W]
//  1   2   3   4   5   6   7   8   9
// `

const initialCrates = () => ([
    [],
    [...'NBDTVGZJ'],
    [...'SRMDWPF'],
    [...'VCRSZ'],
    [...'RTJZPHG'],
    [...'TCJNDZQF'],
    [...'NVPWGSFM'],
    [...'GCVBPQ'],
    [...'ZBPN'],
    [...'WPJ'],
])

const crateOperator9000 = (input: number[], crates: string[][]) => {
    let [amount, from, to] = input
    while (amount > 0) {
        crates[to].push(crates[from].pop() as string)
        amount--
    }
}

const crateOperator9001 = (input: number[], crates: string[][]) => {
    let [amount, from, to] = input
    crates[from]
        .splice(crates[from].length - amount, amount)
        .forEach(item => crates[to].push(item))
}

const elvesWork = (input: string, initial: string[][], fn: (input: number[], crates: string[][]) => void) => {
    const parsed = (parseInput(input) as string[][]).map(item => item
        .map((item: string) => isNaN(parseInt(item)) ? null : parseInt(item))
        .filter(Boolean)
    )
    parsed.forEach(input => {
        fn(input as number[], initial)
    })
    initial.shift()

    return initial.reduce((curr, row) => {
        return curr + row[row.length - 1]
    }, '')
}

export const day5 = (input: string, initial: string[][]) => {
    return elvesWork(input, initial, crateOperator9000)
}

export const day52 = (input: string, initial: string[][]) => {
    return elvesWork(input, initial, crateOperator9001)
}

console.log('day5 part1', day5(input, initialCrates()))
console.log('day5 part2', day52(input, initialCrates()))