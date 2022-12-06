import {day6, day62} from './day6'


describe('testing day 6', () => {

    // part 1
    it('should return 5', () => {
        expect(day6('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
    })

    it('should return 6', () => {
        expect(day6('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
    })

    it('should return 10', () => {
        expect(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
    })

    it('should return 11', () => {
        expect(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
    })

    it('should return undefined', () => {
        expect(day6('abacadaeafagahaiakalamanaoaparatasatauavawazax')).toBe(undefined)
    })

    // part 2
    it('should return 19', () => {
        expect(day62('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19)
    })

    it('should return 23', () => {
        expect(day62('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
    })

    it('should return 23', () => {
        expect(day62('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
    })

    it('should return 29', () => {
        expect(day62('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29)
    })

    it('should return undefined', () => {
        expect(day62('abacadaeafagahaiakalamanaoaparatasatauavawazax')).toBe(undefined)
    })
})
