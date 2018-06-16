export abstract class Collection<T> {
    abstract add(value: T): void;
    abstract clear(): void;
    abstract erase(value: T): void;
    abstract find(value: T): boolean;
    abstract iterator(): Iterator<T>;
    abstract size(): number;

    empty(): boolean {
        return this.size() == 0;
    }

    toArray(): T[] {
        let xs: T[] = [];

        for (let x of this) {
            xs.push(x);
        }

        return xs;
    }

    [Symbol.iterator](): Iterator<T> {
        return this.iterator();
    }
}

export abstract class List<T> extends Collection<T> {
    abstract addAt(index: number, value: T): void;
    abstract at(index: number): T;
    abstract eraseAt(index: number): void;
    abstract find(value: T): boolean;
}

export type Comparator<T> = (lhs: T, rhs: T) => number;

export function defaultCompare<T>(lhs: T, rhs: T): number {
    if (lhs < rhs) {
        return -1;
    } else if (lhs > rhs) {
        return 1;
    } else {
        return 0;
    }
}
