import { inputReader, parseInput } from './aocHelper'

const input = inputReader('./day12.txt')
const aplhabet = 'abcdefghijklmnopqrstuvwxyz'
const alphabetIndex = (letter: string) => aplhabet.indexOf(letter)

const getMeta = (parsed: string[]) => {
    const x = parsed[0].length
    const y = parsed.length
    const target = parsed.join('').indexOf('E')
    const start = parsed.join('').indexOf('S')

    return [x, y, target, start]
}

const getLetter = (grid: string[], index: number) => {
    return grid.join('')[index]
}

const getPath = (
    prev: Set<{ current: number, previous: number }>,
    target: number,
    start: number,
    parsed: string[],
    getAElevation: boolean) => {
    let current = target
    let path = [current]
    while (current !== start) {
        const { previous } = [...prev].find(({ current }) => current === path[0])!
        path = [previous, ...path]
        current = previous
        if (getAElevation && getLetter(parsed, current) === 'a') break
    }
    return path
}

type letter = [string, number]
export const solution = (input: string, getAElevation = false) => {
    const parsed = parseInput(input)
    const [x, y, target, start] = getMeta(parsed as string[])
    const gridInitialValues = parsed.join('').split('')
    gridInitialValues[target] = 'z'
    gridInitialValues[start] = 'a'

    let queue = [start]
    let prev: Set<{ current: number, previous: number }> = new Set()
    let visited: Set<number> = new Set()

    while (queue.length) {
        const [i, ...rest] = queue
        const current: letter = [gridInitialValues[i], i]
        const up: letter = [gridInitialValues[i - x], i - x]
        const down: letter = [gridInitialValues[i + x], i + x]
        const left: letter = [Math.trunc((i - 1) / x) === Math.trunc(i / x) ? gridInitialValues[i - 1] : '', i - 1]
        const right: letter = [Math.trunc((i + 1) / x) === Math.trunc(i / x) ? gridInitialValues[i + 1] : '', i + 1]

        // queue directions
        for (const position of [up, down, left, right]) {
            const [letter, index] = position
            const [currentLetter, currentIndex] = current

            if (letter === '' || letter == null || index < 0 || index > x*y) continue

            // if letter is next in alphabet and not visited
            if (
                alphabetIndex(letter) - alphabetIndex(currentLetter) <= 1
                && visited.has(index) === false
            ) {
                rest.push(index)
                prev.add({ current: index, previous: currentIndex })
                visited.add(currentIndex)
                if (index === target) {
                    const result = getPath(prev, target, start, parsed as string[], getAElevation)

                    return result.length - 1
                }
            }
        }
        queue = [...new Set(rest)]
    }

    // get path from prev array where current has previous value
    return null

}

console.log('day 12 part 1:', solution(input))
console.log('day 12 part 2:', solution(input, true))
