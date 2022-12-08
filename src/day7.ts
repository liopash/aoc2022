import { inputReader } from './aocHelper'
import {randomUUID} from 'crypto'

const input = inputReader('./day7.txt')

const crawler = (input: string) => {
    const lines = input.split('\n')
    const fs = new Map()
    const rootIdx = randomUUID()
    const folders: any = {'root': rootIdx}
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
                    parrent: path[path.length - 1],
                    parrentIdx: folders[path[path.length - 1]],
                    size: parseInt(a)
                })
                updateDir(folders[path[path.length - 1]], fs, parseInt(a))
            }
            if (a === 'dir') {
                fs.set(idx, {
                    dir: b,
                    content: null,
                    parrent: path[path.length - 1],
                    parrentIdx: folders[path[path.length - 1]],
                    size: 0,
                })
                folders[b] = idx
                updateDir(folders[path[path.length - 1]], fs, 0)
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
    // console.log('folders', folders.length, folders.map((f: any) => f.dir))
    return folders
}

export const part1 = (input: string) => {
    const parsed = crawler(input)
    const folders = getFolders(parsed)
    // console.log('Folders', JSON.stringify(folders))
    // console.log('Parsed', parsed)

    return folders.filter((f: any) => f.size <= 100000).reduce((a: number, b: any) => a + b.size, 0)
}

export const part2 = (input: string) => {
    //
}

console.log('day7 part1', part1(input))
// console.log('day7 part2', part2(input))