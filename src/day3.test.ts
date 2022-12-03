import {day3, day32} from './day3'

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

describe('testing day 3', () => {

    it('should return 157', () => {
        expect(day3(testInput)).toBe(157)
    })

    it('should return 70', () => {
        expect(day32(testInput)).toBe(70)
    })
})
