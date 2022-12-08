import {part1} from './day7'

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
dir a
584 i
1000 fuf
$ cd a
$ ls
999 bollocks
$ cd ..
$ cd ..
$ cd d
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe('testing day 7', () => {

    // part 1
    it('should return 100434', () => {
        expect(part1(testInput)).toBe(100434)
    })

})