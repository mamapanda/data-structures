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

export abstract class Indexable<T> extends Collection<T> {
    abstract at(index: number): T;
    abstract eraseAt(index: number): void;
}

export abstract class List<T> extends Indexable<T> {
    abstract addAt(index: number, value: T): void;
    abstract update(index: number, value: T): void;
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

export type Equality<T> = (lhs: T, rhs: T) => boolean;

export function defaultEquality<T>(lhs: T, rhs: T): boolean {
    return lhs == rhs;
}
