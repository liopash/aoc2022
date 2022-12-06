import {day5, day52} from './day5'

let initialCrates: string[][]

beforeEach(() => {
initialCrates = [
    [],
    ['Z','N'],
    ['M', 'C', 'D'],
    ['P'],
 ]
})

const testInput = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

describe('testing day 4', () => {

    it.skip('should return CMZ', () => {
        expect(day5(testInput, initialCrates)).toBe('CMZ')
    })

    it.skip('should return MCD', () => {
        expect(day52(testInput, initialCrates)).toBe('MCD')
    })
})
