import { solution } from './day11'


const testInput = [{
    monkey: 0,
    items: [79, 98],
    worry: (old: number) => old * 19,
    divisible: {
        mod: 23,
        true: 2,
        false: 3,
    }
}, {
    monkey: 1,
    items: [54, 65, 75, 74],
    worry: (old: number) => old + 6,
    divisible: {
        mod: 19,
        true: 2,
        false: 0,
    },
}, {
    monkey: 2,
    items: [79, 60, 97],
    worry: (old: number) => old * old,
    divisible: {
        mod: 13,
        true: 1,
        false: 3,
    },
}, {
    monkey: 3,
    items: [74],
    worry: (old: number) => old + 3,
    divisible: {
        mod: 17,
        true: 0,
        false: 1,
    },
}]

describe('day11', () => {
    describe('part1', () => {
        it.skip('should return [105, 101]', () => {
            expect(solution(testInput,20,3)).toEqual([105, 101])
        })
    })

    describe('part2', () => {
        it.skip('should return [52166, 52013]', () => {
            expect(solution(testInput,10_000)).toEqual([52166, 52013])
        })
    })
})