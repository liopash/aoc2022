import { inputReader, parseInput } from './aocHelper'

const input = inputReader('./day8.txt')

const getLeft = (input: string[][], x: number, y: number) => {
    const tree = input[y][x]
    const trees = []
    for (let i = x - 1; i >= 0; i--) {
        if (input[y][i] >= tree) {
            trees.push(input[y][i])
        }
    }
    const scenics = []
    for (let i = x - 1; i >= 0; i--) {
        scenics.push(input[y][i])
        if (input[y][i] >= tree) break
    }

    return [trees, scenics]
}

const getRight = (input: string[][], x: number, y: number) => {
    const tree = input[y][x]
    const trees = []
    const scenics = []
    for (let i = x + 1; i < input[0].length; i++) {
        if (input[y][i] >= tree) {
            trees.push(input[y][i])
        }
    }
    for (let i = x + 1; i < input[0].length; i++) {
        scenics.push(input[y][i])
        if (input[y][i] >= tree) break
    }

    return [trees, scenics]
}

const getUp = (input: string[][], x: number, y: number) => {
    const tree = input[y][x]
    const trees = []
    const scenics = []
    for (let i = y - 1; i >= 0; i--) {
        if (input[i][x] >= tree) {
            trees.push(input[i][x])
        }
    }
    for (let i = y - 1; i >= 0; i--) {
        scenics.push(input[i][x])
        if (input[i][x] >= tree) break
    }

    return [trees, scenics]
}

const getDown = (input: string[][], x: number, y: number) => {
    const tree = input[y][x]
    const trees = []
    const scenics = []
    for (let i = y + 1; i < input.length; i++) {
        if (input[i][x] >= tree) {
            trees.push(input[i][x])
        }
    }
    for (let i = y + 1; i < input.length; i++) {
        scenics.push(input[i][x])
        if (input[i][x] >= tree) break
    }

    return [trees, scenics]
}


const getVisibleTrees = (input: string[][]) => {
    const x = input[0].length
    const y = input.length
    const trees = []
    const scenicsScore = []
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const tree = input[j][i]
            const [treeLeft, scLeft] = getLeft(input, i, j)
            const [treeRight, scRight] = getRight(input, i, j)
            const [treeUp, scUp] = getUp(input, i, j)
            const [treeDown, scDown] = getDown(input, i, j)

            if (treeLeft.length === 0 || treeRight.length === 0 || treeUp.length === 0 || treeDown.length === 0) {
                trees.push(tree)
            }
            scenicsScore.push(scLeft.length * scRight.length * scUp.length * scDown.length)
        }
    }

    return [trees, scenicsScore]
}

export const part1 = (input: string) => {
    const parsed = parseInput(input).map(row => (row as string).split(''))
    const [tress] = getVisibleTrees(parsed)

    return tress.length
}

export const part2 = (input: string) => {
    const parsed = parseInput(input).map(row => (row as string).split(''))
    const [_, scenics] = getVisibleTrees(parsed)

    const max = Math.max(...((scenics as string[]).map(i => parseInt(i, 10))))

    return max
}

console.log('day8 part1', part1(input))
console.log('day8 part2', part2(input))