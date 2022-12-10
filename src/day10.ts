import { inputReader, parseInput } from './aocHelper'

const input = inputReader('./day10.txt')

const computer = (parsed: string[]) => {
    let X = 1
    let counter = 1
    let processing = parsed
    const result: number[][] = []
    let buffer: (number | null)[] = []
    let sprite: string = '#'
    const drawing: string[] = []

    while (counter <= 240) {
        const [head, ...tail] = processing

        // buffer processing
        if (head != null) {
            const [instructions, value] = head
            if (instructions === 'noop') {
                buffer = [...buffer, null]
            }
            if (instructions === 'addx') {
                buffer = [...buffer, null, parseInt(value)]
            }
        }

        // computation
        const [headB, ...tailB] = buffer
        if (headB != null) {
            X = X + headB
        }

        // Drawing
        if (new Set([X-1, X, X+1]).has(counter % 40)) {
            sprite = sprite + '#'
            } else {
            sprite = sprite + ' '
        }
        if (sprite.length % 40 === 0) {
            drawing.push(sprite)
            sprite = ''
        }

        // maintenance
        buffer = tailB
        processing = tail
        counter++

        result.push([counter, X])
    }

    console.log(drawing)
    return {
        result,
        drawing
    }
}


export const part1 = (input: string) => {
    const parsed = parseInput(input)
    const {result} = computer((parsed as string[]))
    const indexed = [20, 60, 100, 140, 180, 220].reduce((acc, counter) => {
        const [_, X] = result.find(([c, _]) => c === counter) as [number, number]
        acc.push(X * counter)
        return acc
    }, [] as number[])

    return [indexed, indexed.reduce((acc, x) => acc + x, 0)]
}

console.log('day 10 part 1/2:', part1(input))
