import { Collection, Equality, defaultEquality } from './collection';

export class HashTable<T> extends Collection<T> {
    constructor(hash: (value: T) => number, equal: Equality<T> = defaultEquality) {
        super();

        this.data = [];
        this.equal = equal;
        this.hash = hash;
    }

    add(value: T): void {
        let i: number = this.hash(value);

        while (this.data[i] != undefined) { // undefined == null
            if (this.equal(this.data[i], value)) {
                return;
            }

            ++i;
        }

        this.data[i] = value;
    }

    clear(): void {
        this.data = [];
    }

    erase(value: T): void {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            this.data[i] = null;
        }
    }

    find(value: T): boolean {
        return this.indexOf(value) >= 0;
    }

    *iterator(): Iterator<T> {
        for (let x of this.data) {
            if (x != undefined) {
                yield x;
            }
        }
    }

    size(): number {
        let count: number = 0;

        for (let i: number = 0; i < this.data.length; ++i) {
            if (this.data[i] != undefined) {
                ++count;
            }
        }

        return count;
    }

    toString(): string {
        return `[${this.data.toString()}]`;
    }

    private data: T[]; // undefined == never inserted, null == deleted value
    private equal: Equality<T>;
    private hash: (value: T) => number;

    private indexOf(value: T): number {
        let i: number = this.hash(value);

        while (i < this.data.length && this.data[i] !== undefined) {
            if (this.equal(this.data[i], value)) {
                return i;
            }

            ++i;
        }

        return -1;
    }
}
