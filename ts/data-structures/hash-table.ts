import { Collection, Equality, defaultEquality } from './collection';

/**
 * A hash table relying on linear probing for collisions.
 */
export class HashTable<T> extends Collection<T> {
    /**
     * The constructor.
     * @param hash the hash function to use
     * @param equal the equality function to use when comparing values in _this_
     */
    constructor(hash: (value: T) => number, equal: Equality<T> = defaultEquality) {
        super();

        this.data = [];
        this.equal = equal;
        this.hash = hash;
    }

    /**
     * See parent documentation.
     */
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

    /**
     * See parent documentation.
     */
    clear(): void {
        this.data = [];
    }

    /**
     * See parent documentation.
     */
    erase(value: T): void {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            this.data[i] = null;
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): boolean {
        return this.indexOf(value) >= 0;
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        for (let x of this.data) {
            if (x != undefined) {
                yield x;
            }
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        let count: number = 0;

        for (let i: number = 0; i < this.data.length; ++i) {
            if (this.data[i] != undefined) {
                ++count;
            }
        }

        return count;
    }

    /**
     * See parent documentation.
     */
    toString(): string {
        return `[${this.data.toString()}]`;
    }

    /**
     * The underlying array representation of _this_.
     * If a value at a slot is null, then a value was placed there before
     * and deleted later. If the value is undefined, then no value was ever
     * inserted into the slot.
     */
    private data: T[];

    /**
     * The function to use when checking if two values are equal.
     */
    private equal: Equality<T>;

    /**
     * The hash function to use.
     */
    private hash: (value: T) => number;

    /**
     * Calculates the index of the given value inside _this_.data.
     * @param value the value
     * @return the index, or -1 if the value is not found
     */
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
