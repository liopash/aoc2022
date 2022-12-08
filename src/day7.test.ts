import {part1, part2} from './day7'

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe('testing day 7', () => {

    // part 1
    it.skip('should return 95437', () => {
        expect(part1(testInput)).toBe(95437)
    })

    // part 2
    it.skip('should return 24933642', () => {
        expect(part2(testInput)).toBe(24933642)
    })
})