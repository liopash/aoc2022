import {inputReader, parseInput} from './aocHelper'

const input = inputReader('./day4.txt')

const range = (item: string) => {
    const [start, end] = item.split('-')
    let range = []
    for (let i = parseInt(start); i <= parseInt(end); i++) {
        range.push(i)
    }

    return range
}

const included = (a: number[], b: number[], some = false) => {
    let [target, arr] = [a, b]
    if (a.length > b.length) {
        [target, arr] = [b, a]
    }

    if (some) {
        return target.some(x => arr.includes(x))
    }

    return target.every(v => arr.includes(v))
}

export const day4 = (input: string, some = false) => {
    const parsed = parseInput(input)
        .map(([a, b]) => [range(a as string), range(b as string)])
        .map(([a, b]) => included(a, b, some))
        .filter(Boolean)

        return parsed.length
}

export const day42 = (input: string) => {
    return day4(input, true)
}

console.log('day3 part1', day4(input))
console.log('day3 part2', day42(input))