namespace Collections {
    export interface Collection<T> {
        add(value: T): boolean;
        clear(): void;
        empty(): boolean;
        eraseAt(position: Iterator<T>): boolean;
        find(value: T): Iterator<T>;
        find(value: T, equal: (lhs: T, rhs: T) => boolean): Iterator<T>;
        iterator(): Iterator<T>;
        size(): number;
    }

    export interface Iterator<T> {
        next(i?: number): boolean;
        nextIterator(i?: number): Iterator<T>;
        previous(i?: number): boolean;
        previousIterator(i?: number): Iterator<T>;
        valid(): boolean;
        value(): T;
    }

    export interface List<T> extends Collection<T> {
        addAt(index: number, value: T): boolean;
        addAt(position: List.Iterator<T>, value: T): boolean;
        at(index: number): T;
        eraseAt(position: Iterator<T> | number): boolean;
        iterator(): List.Iterator<T>;
    }

    export namespace List {
        export interface Iterator<T> extends Collections.Iterator<T> {
            setValue(): T;
        }
    }

    export interface IEqual<T> {
        equals(other: T): boolean;
    }

    export interface IOrdered<T> {
        lessThan(other: T): boolean;
    }
}
