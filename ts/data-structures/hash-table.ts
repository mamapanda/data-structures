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

        this.resetData();
        this.equal = equal;
        this.hash = hash;
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        let i: number;

        for (i = this.hash(value); i < this.data.length; ++i) {
            let x: T | null | undefined = this.data[i];

            if (x == undefined) { // undefined == null
                this.data[i] = value;
                return;
            } else if (this.equal(x, value)) {
                return;
            }
        }

        this.resize(i + 1);

        this.data[i] = value;
    }

    /**
     * See parent documentation.
     */
    clear(): void {
        this.resetData();
    }

    /**
     * See parent documentation.
     */
    empty(): boolean {
        return this.data.every(x => x == undefined); // null == undefined
    }

    /**
     * See parent documentation.
     */
    erase(value: T): boolean {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            this.data[i] = null;

            return true;
        } else {
            return false;
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): T | undefined {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            let x: T | null | undefined = this.data[i];

            if (x == null) { // null == undefined
                throw Error();
            }

            return x;
        } else {
            return undefined;
        }
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
    private data: (T | null | undefined)[];

    /**
     * The function to use when checking if two values are equal.
     */
    private readonly equal: Equality<T>;

    /**
     * The hash function to use.
     */
    private readonly hash: (value: T) => number;

    /**
     * Calculates the index of the given value inside _this_.data.
     * @param value the value
     * @return the index, or -1 if the value is not found
     */
    private indexOf(value: T): number {
        for (let i: number = this.hash(value); i < this.data.length; ++i) {
            let x: T | null | undefined = this.data[i];

            if (x === undefined) {
                break;
            } else if (x != null && this.equal(x, value)) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Resets _this_.data to an array of 10 undefined elements.
     */
    private resetData(): void {
        this.data = Array.apply(null, Array(10)); // dense instead of sparse
    }

    /**
     * Doubles the size of _this_.data until it is greater than or equal
     * to minSize.
     * @param minSize the minimum size for _this_.data
     */
    private resize(minSize: number): void {
        while (this.data.length < minSize) {
            let newSlots: T[] = Array.apply(null, Array(this.data.length));

            this.data = this.data.concat(newSlots);
        }
    }
}
