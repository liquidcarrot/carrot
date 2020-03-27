export function pickRandom<T>(arr: T[]): T {
    return arr[randInt(0, arr.length)];
}

export function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function randDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randBoolean(): boolean {
    return Math.random() >= 0.5;
}

export function anyMatch<T>(arr: T[], elem: T): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

export function remove<T>(arr: T[], elem: T): boolean {
    let index: number = arr.indexOf(elem);
    if (index == -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}

export function getOrDefault<T>(value: T | undefined | null, defaultValue: T): T {
    return value !== undefined && value !== null ? value : defaultValue;
}
