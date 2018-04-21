export abstract class Collection<T> {
    abstract add(value: T): void;
    abstract clear(): void;
    abstract eraseAt(position: BiIterator<T>): void;
    abstract find(value: T): BiIterator<T>;
    abstract iterator(): BiIterator<T>;
    abstract size(): number;

    empty(): boolean {
        return this.size() == 0;
    }

    [Symbol.iterator](): Iterator<T> {
        let it: BiIterator<T> = this.iterator();

        return {
            next(): IteratorResult<T> {
                if (it.valid()) {
                    let value: T = it.value();

                    it.forward();

                    return {
                        value: value,
                        done: false
                    };
                } else {
                    return {
                        value: null,
                        done: true
                    };
                }
            }
        }
    }
}

export interface BiIterator<T> {
    back(): void;
    forward(): void;
    hasNext(): boolean;
    hasPrevious(): boolean;
    source(): Collection<T>;
    valid(): boolean;
    value(): T;
}

export interface List<T> extends Collection<T> {
    addAt(index: number, value: T): boolean;
    addAt(position: ListIterator<T>, value: T): boolean;
    at(index: number): T;
    eraseAt(position: BiIterator<T> | number): boolean;
    iterator(): ListIterator<T>;
}

export interface ListIterator<T> extends BiIterator<T> {
    setValue(): T;
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

export function toArray<T>(collection: Collection<T>): T[] {
    let xs: T[] = [];

    for (let x of collection) {
        xs.push(x);
    }

    return xs;
}
