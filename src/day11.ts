type Monkey = {
    monkey: number
    items: number[]
    worry: (old: number) => number
    divisible: {
        mod: number
        true: number
        false: number
    }
}

const monkeyInput: Monkey[] = [
    {
        monkey: 0,
        items: [89, 73, 66, 57, 64, 80],
        worry: (old: number) => old * 3,
        divisible: {
            mod: 13,
            true: 6,
            false: 2,
        }
    }, {
        monkey: 1,
        items: [83, 78, 81, 55, 81, 59, 69],
        worry: (old: number) => old + 1,
        divisible: {
            mod: 3,
            true: 7,
            false: 4,
        }
    }, {
        monkey: 2,
        items: [76, 91, 58, 85],
        worry: (old: number) => old * 13,
        divisible: {
            mod: 7,
            true: 1,
            false: 4,
        }
    }, {
        monkey: 3,
        items: [71, 72, 74, 76, 68],
        worry: (old: number) => old * old,
        divisible: {
            mod: 2,
            true: 6,
            false: 0,
        }
    }, {
        monkey: 4,
        items: [98, 85, 84],
        worry: (old: number) => old + 7,
        divisible: {
            mod: 19,
            true: 5,
            false: 7,
        }
    }, {
        monkey: 5,
        items: [78],
        worry: (old: number) => old + 8,
        divisible: {
            mod: 5,
            true: 3,
            false: 0,
        }
    }, {
        monkey: 6,
        items: [86, 70, 60, 88, 88, 78, 74, 83],
        worry: (old: number) => old + 4,
        divisible: {
            mod: 11,
            true: 1,
            false: 2,
        }
    }, {
        monkey: 7,
        items: [81, 58],
        worry: (old: number) => old + 5,
        divisible: {
            mod: 17,
            true: 3,
            false: 5,
        }
    }]

const monkeyBiz = (input: Monkey[], rounds: number, bored_factor: number) => {
    const shennanigans: { [name: string]: number } = {}

    // modulo applicable to all monkeys
    const d = input.map((m) => m.divisible.mod).reduce((acc, n) => acc * n, 1)

    // rounds
    for (let i = 1; i <= rounds; i++) {

        // monkeys
        for (let index = 0; index < input.length; index++) {
            const monkey = input[index]
            shennanigans[index] = (shennanigans[index] ?? 0) + monkey.items.length
            const newItems = input.map((m) => m.items)
            for (const item of monkey.items) {
                const newWorry = Math.trunc(monkey.worry(item % d) / bored_factor)
                const divisible = newWorry % monkey.divisible.mod === 0
                if (divisible) {
                    newItems[monkey.divisible.true] = [...newItems[monkey.divisible.true], newWorry]
                }
                else {
                    newItems[monkey.divisible.false] = [...newItems[monkey.divisible.false], newWorry]
                }
            }
            // delete processed monkey items
            newItems[index] = []

            // update input with new items
            input = input.map((m) => ({
                monkey: m.monkey,
                items: newItems[m.monkey] ?? m.items,
                worry: m.worry,
                divisible: m.divisible,
            }))
        }
    }

    return shennanigans
}


export const solution = (input: Monkey[], rounds: number, bored_factor = 1) => {
    const shennanigans = monkeyBiz(input, rounds, bored_factor)

    // return the two most active monkeys
    return Object.keys(shennanigans).map((monkey) => shennanigans[monkey]).sort((a, b) => b - a).slice(0, 2)
}

console.log('Part 1', solution(monkeyInput, 20, 3), solution(monkeyInput, 20, 3).reduce((acc, n) => acc * n, 1))
console.log('Part 2', solution(monkeyInput, 10_000), solution(monkeyInput, 10_000).reduce((acc, n) => acc * n, 1))