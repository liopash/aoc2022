import {day4, day42} from './day4'

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-2,2-4
2-6,4-8`

describe('testing day 4', () => {

    it('should return 3', () => {
        expect(day4(testInput)).toBe(3)
    })

    it('should return 5', () => {
        expect(day42(testInput)).toBe(5)
    })
})
