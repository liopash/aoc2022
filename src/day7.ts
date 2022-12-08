import { inputReader } from './aocHelper'
import {randomUUID} from 'crypto'

const input = inputReader('./day7.txt')

const crawler = (input: string) => {
    const lines = input.split('\n')
    const fs = new Map()
    const rootIdx = randomUUID()
    const folders: any = {root: rootIdx}
    fs.set(rootIdx, { dir: 'root', content: null, parrent: null, parrentIdx: null, size: 0 })
    const path: string[] = []
    for (const line of lines) {
        const idx = randomUUID()
        const [a, b, c] = line.split(' ')
        if (a === '$') {
            if (c === '..') {
                path.pop()
                continue
            }
            if (c === '/') {
                path.push('root')
                continue
            }
            if (c != null) {
                path.push(c)
            }
            continue
        }
        if (c == null) {
            if (a !== 'dir') {
                fs.set(idx, {
                    dir: null,
                    content: b,
                    parrentIdx: folders[path.join('/')],
                    size: parseInt(a)
                })
                updateDir(folders[path.join('/')], fs, parseInt(a))
            }
            if (a === 'dir') {
                fs.set(idx, {
                    dir: b,
                    content: null,
                    parrentIdx: folders[path.join('/')],
                    size: 0,
                })
                folders[[...path, b].join('/')] = idx
                updateDir(folders[path.join('/')], fs, 0)
            }
        }
    }

    return fs
}

const updateDir = (parrentIdx: number, fs: any, size: number) => {
    const parrent = fs.get(parrentIdx)
    fs.set(parrentIdx, { ...parrent, size: parrent.size + size })
    if (parrent.parrentIdx != null) {
        updateDir(parrent.parrentIdx, fs, size)
    }
}

const getFolders = (filesystem: any) => {
    const folders: any = []
    filesystem.forEach((f: any) => {
        if(f.dir != null) {
            folders.push(f)
        }
    })
    return folders
}

export const part1 = (input: string) => {
    const parsed = crawler(input)
    const folders = getFolders(parsed)

    return folders.filter((f: any) => f.size <= 100000).reduce((a: number, b: any) => a + b.size, 0)
}

export const part2 = (input: string) => {
    const parsed = crawler(input)
    const folders = getFolders(parsed)

    const sizes = folders.map((item: any) => item.size)
    const max = Math.max(...sizes)

    return Math.min(...sizes.filter((s: number) => s >= 30000000 - (70000000 - max)))
}

console.log('day7 part1', part1(input))
console.log('day7 part2', part2(input))