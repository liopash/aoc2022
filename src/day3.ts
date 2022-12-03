import {inputReader, parseInput} from './aocHelper'
const alphabet = [...'_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']
const input = inputReader('./day3.txt')

const halves = (list: string) => {
    const half = Math.ceil(list.length / 2)
    return [list.slice(0, half), list.slice(half)]
}

const intersect = (a: string[], b: string[]) => {
    return [...new Set(a)].filter(x => (new Set(b)).has(x))
}

export const day3 = (input: string) => {
    const parsed = parseInput(input).map(item => halves(item as string))
    const intersection = parsed.map(([a, b]) => intersect([...a], [...b]))

    return intersection.reduce((curr, [letter]) => {
        return curr + alphabet.indexOf(letter)
    }, 0)
}

export const day32 = (input: string) => {
    const parsed = parseInput(input)
    let triplets = []
    for (let i = 0; i < parsed.length; i += 3) {
        triplets.push([parsed[i], parsed[i + 1], parsed[i + 2]])
    }
    const intersection = triplets.map(([a, b, c]) => {
        return intersect(
            intersect([...a], [...b]),
            [...c]
            )
    })

    return intersection.reduce((curr, [letter]) => {
        return curr + alphabet.indexOf(letter)
    }, 0)
}



console.log('day 3 part 1', day3(input))
console.log('day 3 part 2', day32(input))