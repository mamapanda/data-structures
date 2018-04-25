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

    findIf(p: (value: T) => boolean): BiIterator<T> {
        for (let it: BiIterator<T> = this.iterator(); it.valid(); it.forward()) {
            if (p(it.value())) {
                return it;
            }
        }

        return null;
    }

    toArray(): T[] {
        let xs: T[] = [];

        for (let x of this) {
            xs.push(x);
        }

        return xs;
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

    protected validate(it: BiIterator<T>) {
        return it.source() == this && it.valid();
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

export abstract class List<T> extends Collection<T> {
    abstract addAt(index: number, value: T): void;
    abstract addAt(position: ListIterator<T>, value: T): void;
    abstract at(index: number): T;
    abstract eraseAt(position: BiIterator<T> | number): void;
    abstract find(value: T): ListIterator<T>;
    abstract iterator(): ListIterator<T>;
}

export interface ListIterator<T> extends BiIterator<T> {
    setValue(value: T): void;
    source(): List<T>;
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
