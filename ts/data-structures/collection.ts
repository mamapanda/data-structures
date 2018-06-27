/**
 * Abstract class for a generic collection.
 */
export abstract class Collection<T> {
    /**
     * Adds the given value to _this_.
     * @param value the value to add
     */
    abstract add(value: T): void;

    /**
     * Removes all values from _this_.
     */
    abstract clear(): void;

    /**
     * @return whether _this_ contains no values
     */
    abstract empty(): boolean;

    /**
     * Erases the given value from _this_.
     * Nothing is done if _this_ does not contain the value.
     * @param value the value to erase
     */
    abstract erase(value: T): void;

    /**
     * Checks if _this_ contains the given value.
     * @param value the value to check for
     * @return whether _this_ contains the given value
     */
    abstract find(value: T): boolean;

    /**
     * @return an Iterator object that iterates over the values in _this_
     */
    abstract iterator(): Iterator<T>;

    /**
     * @return the number of values contained in _this_
     */
    abstract size(): number;

    /**
     * @return the string representation of _this_
     */
    abstract toString(): string;

    /**
     * Converts _this_ into an array.
     * @return an array of the values in _this_
     */
    toArray(): T[] {
        let xs: T[] = [];

        for (let x of this) {
            xs.push(x);
        }

        return xs;
    }

    /**
     * TypeScript iterator method.
     */
    [Symbol.iterator](): Iterator<T> {
        return this.iterator();
    }
}

/**
 * An indexable collection.
 */
export abstract class Indexable<T> extends Collection<T> {
    /**
     * Finds the value at the given index.
     * An error is thrown if the index is out of bounds.
     * @param index the index
     * @return the value at the given index
     */
    abstract at(index: number): T;

    /**
     * Erases the value at the given index.
     * An error is thrown if the index is out of bounds.
     * @param index the index
     */
    abstract eraseAt(index: number): void;
}

/**
 * An indexable collection where value order does not matter.
 */
export abstract class List<T> extends Indexable<T> {
    /**
     * Adds the given value at the given index.
     * If the index == _this_.size(), then the value is added at the end.
     * An error is thrown if the index is out of bounds.
     * @param index the index
     * @param value the value to add
     */
    abstract addAt(index: number, value: T): void;

    /**
     * Replaces the value at the given index.
     * An error is thrown if the index is out of bounds.
     * @param index the index
     * @param value the new value
     */
    abstract update(index: number, value: T): void;
}

/**
 * A type for comparator functions.
 * @return a value < 0 if lhs < rhs, 0 if lhs == rhs, or a value > 0 if lhs > rhs
 */
export type Comparator<T> = (lhs: T, rhs: T) => number;

/**
 * The default comparator function.
 */
export function defaultCompare<T>(lhs: T, rhs: T): number {
    if (lhs < rhs) {
        return -1;
    } else if (lhs > rhs) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * A type for equality functions.
 * @return whether lhs and rhs are equal
 */
export type Equality<T> = (lhs: T, rhs: T) => boolean;

/**
 * The default equality function.
 */
export function defaultEquality<T>(lhs: T, rhs: T): boolean {
    return lhs == rhs;
}
