import { inputReader, parseInput } from './aocHelper'

const input = inputReader('./day9.txt')

// const drawGrid = (size: number, head: number, tail: number, tailHistory: number[]) => {
//     const grid = Array(size*size).fill('.')
//     tailHistory.forEach((coordinate) => {
//         grid[coordinate] = 't'
//     })
//     grid[head] = 'H'
//     grid[tail] = 'T'
//     let output = ''
//     for (let i = 0; i < grid.length; i++) {
//         output = output + grid[i]
//         if ((i + 1) % size === 0) {
//             output = output + '\n'
//         }
//     }

//     return output
// }


const initialState = () => ({
    size: 6000,
    headCoordinates: 18003000,
    tailCoordinates: 18003000,
    tailHistory: [],
    tails: {
        t1: 18003000,
        t2: 18003000,
        t3: 18003000,
        t4: 18003000,
        t5: 18003000,
        t6: 18003000,
        t7: 18003000,
        t8: 18003000,
        t9: 18003000,
    },
    initialCoordinates: 18003000,

})

type state = {
    size: number,
    headCoordinates: number,
    tailCoordinates: number,
    tailHistory: number[],
    tails: {
        [name: string]: number
    }
    initialCoordinates: number,
}

const headMove = (direction: string, power: number, state: state ) => {
    // head can move in 4 directions (up, down, left, right)
    const { headCoordinates, size, tailCoordinates, tailHistory, tails } = state
    let newHeadCoordinates = headCoordinates
    // let newTailCoordinates = tailCoordinates
    let newTailHistory = tailHistory
    let {t1, t2, t3, t4, t5, t6, t7, t8, t9} = tails

    for (let i = 0; i < power; i++) {
        if (direction === 'U') {
            newHeadCoordinates = newHeadCoordinates - size
        }
        if (direction === 'D') {
            newHeadCoordinates = newHeadCoordinates + size
        }
        if (direction === 'L') {
            newHeadCoordinates = newHeadCoordinates - 1
        }
        if (direction === 'R') {
            newHeadCoordinates = newHeadCoordinates + 1
        }

        // tail me up baby
        t1 = moveTail(newHeadCoordinates, t1, size)
        t2 = moveTail(t1, t2, size)
        t3 = moveTail(t2, t3, size)
        t4 = moveTail(t3, t4, size)
        t5 = moveTail(t4, t5, size)
        t6 = moveTail(t5, t6, size)
        t7 = moveTail(t6, t7, size)
        t8 = moveTail(t7, t8, size)
        t9 = moveTail(t8, t9, size)
        newTailHistory = [...newTailHistory, t9]
    }

    return {
        ...state,
        headCoordinates: newHeadCoordinates,
        tailCoordinates: t9,
        tailHistory: newTailHistory,
        tails: {
            t1, t2, t3, t4, t5, t6, t7, t8, t9
        }
    }
}

const moveTail = (headCoordinates: number, tailCoordinates: number, size: number) => {

    const proximityCheck = (check: number, coordinate: number, size: number) => {
        return (new Set([
        coordinate - size - 1,  coordinate - size,  coordinate - size + 1,
        coordinate - 1,         coordinate,         coordinate + 1,
        coordinate + size - 1,  coordinate + size,  coordinate + size + 1,
        ]).has(check))
    }


    if (!proximityCheck(tailCoordinates, headCoordinates, size)) {
        if (
            // column
            tailCoordinates % size === headCoordinates % size ||
            // row
            Math.trunc(tailCoordinates / size) === Math.trunc(headCoordinates / size)
        ) {
            const tailUp = tailCoordinates - size
            if (proximityCheck(tailUp, headCoordinates, size)) {
                return tailUp
            }
            const tailDown = tailCoordinates + size
            if (proximityCheck(tailDown, headCoordinates, size)) {
                return tailDown
            }
            const tailLeft = tailCoordinates - 1
            if (proximityCheck(tailLeft, headCoordinates, size)) {
                return tailLeft
            }
            const tailRight = tailCoordinates + 1
            if (proximityCheck(tailRight, headCoordinates, size)) {
                return tailRight
            }
        }

        const tailUpLeft = tailCoordinates - size - 1
        if (proximityCheck(tailUpLeft, headCoordinates, size)) {
            return tailUpLeft
        }

        const tailUpRight = tailCoordinates - size + 1
        if (proximityCheck(tailUpRight, headCoordinates, size)) {
            return tailUpRight
        }

        const tailDownRight = tailCoordinates + size + 1
        if (proximityCheck(tailDownRight, headCoordinates, size)) {
            return tailDownRight
        }

        const tailDownLeft = tailCoordinates + size - 1
        if (proximityCheck(tailDownLeft, headCoordinates, size)) {
            return tailDownLeft
        }
    }

    return tailCoordinates
}

const getSize = (instructions: string[][]) => {
    const x = instructions.reduce((acc, [direction, power]) => {
        if (direction === 'R') {
            return acc + parseInt(power)
        }
        return acc
    }, 1)
    const y = instructions.reduce((acc, [direction, power]) => {
        if (direction === 'U') {
            return acc + parseInt(power)
        }
        return acc
    }, 1)

    return [x, y]
}


export const part2 = (input: string) => {
    const instructions = parseInput(input)
    let state: any = {...initialState()}
    for (const step of instructions) {
        const [direction, power] = step
        state = headMove(direction, parseInt(power), state)
    }

    return new Set([...state.tailHistory]).size

}

console.log('day9 part2', part2(input))