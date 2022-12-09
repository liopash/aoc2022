import {part1} from './day9'
import {part2} from './day9b'

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

// const testInput = `R 1
// U 5`


describe('testing day 9', () => {

    // part 1
    it.skip('should return 13', () => {
        expect(part1(testInput)).toBe(13)
    })

    // part 2
    it.skip('should return 8', () => {
        expect(part2(testInput2)).toBe(36)
    })

})
