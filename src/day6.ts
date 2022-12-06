import { inputReader } from './aocHelper'

const input = inputReader('./day6.txt')
const SEQUENCE_LENGTH = 4
const MESSAGE_LENGTH = 14

const unique = (arr: string, length: number) => {
    return (new Set([...arr])).size === length
}

const position = (input: string, length: number) => {
    for (let i = 0; i < input.length; i++) {
        if (unique(input.slice(i, i + length), length))  return i + length
    }
}

export const day6 = (input: string) => {
    return position(input, SEQUENCE_LENGTH)
}

export const day62 = (input: string) => {
    return position(input, MESSAGE_LENGTH)
}

console.log('day6 part1', day6(input))
console.log('day62 part2', day62(input))