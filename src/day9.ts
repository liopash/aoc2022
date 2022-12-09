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
    initialCoordinates: 18003000,
})

type state = {
    size: number,
    headCoordinates: number,
    tailCoordinates: number,
    tailHistory: number[],
    initialCoordinates: number,
}

const headMove = (direction: string, power: number, state: state ) => {
    const { headCoordinates, size, tailCoordinates, tailHistory } = state
    let newHeadCoordinates = headCoordinates
    let newTailCoordinates = tailCoordinates
    let newTailHistory = tailHistory

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
        newTailCoordinates = moveTail(newHeadCoordinates, newTailCoordinates, size)
        newTailHistory = [...newTailHistory, newTailCoordinates]
    }

    return {
        ...state,
        headCoordinates: newHeadCoordinates,
        tailCoordinates: newTailCoordinates,
        tailHistory: newTailHistory,
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

export const part1 = (input: string) => {
    const instructions = parseInput(input)
    let state: any = {...initialState()}
    for (const step of instructions) {
        const [direction, power] = step
        state = headMove(direction, parseInt(power), state)
    }

    return new Set([...state.tailHistory]).size
}

console.log('day9 part1', part1(input))