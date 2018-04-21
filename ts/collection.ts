export interface Collection<T> {
    add(value: T): void;
    clear(): void;
    empty(): boolean;
    eraseAt(position: Iterator<T>): void;
    find(value: T): Iterator<T>;
    iterator(): Iterator<T>;
    size(): number;
}

export interface Iterator<T> {
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
    eraseAt(position: Iterator<T> | number): boolean;
    iterator(): ListIterator<T>;
}

export interface ListIterator<T> extends Iterator<T> {
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

    for (let it: Iterator<T> = collection.iterator(); it.valid(); it.forward()) {
        xs.push(it.value());
    }

    return xs;
}
