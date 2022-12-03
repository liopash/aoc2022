import { readFileSync } from "fs"

export const inputReader = (path: string) => {
    try {
        const data = readFileSync(path, "utf8")
        return data
    } catch (err) {
        console.error(err)
    }
    return ''
}

export const parseInput = (input: string) => {
    const lines = input.split('\n')
    const [head] = lines
    if (head.includes(',')) {
        return lines.map(line => line.split(','))
    }
    if (head.includes(' ')) {
        return lines.map(line => line.split(' '))
    }

    return lines
}

