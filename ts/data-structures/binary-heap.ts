import { Collection, Comparator, defaultCompare } from './collection'

/**
 * A binary heap.
 */
export class BinaryHeap<T> extends Collection<T> {
    /**
     * The constructor.
     * @param compare the function to use when comparing values in _this_
     */
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.data = [];
    }

    /**
     * Finds the minimum value in _this_. An error is thrown if _this_ is empty.
     * @return the minimum value
     */
    min(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.data[0];
    }

    /**
     * Removes the minimum value in _this_. An error is thrown if _this_ is empty.
     * @return the minimum value
     */
    popMin(): T {
        if (this.empty()) {
            throw Error();
        }

        let min: T = this.data[0];
        this.erase(min);

        return min;
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        this.data.push(value);
        this.heapifyUp(this.data.length - 1);
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
    empty(): boolean {
        return this.data.length == 0;
    }

    /**
     * See parent documentation.
     */
    erase(value: T): boolean {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            if (i == this.data.length - 1) { // last element
                this.data.pop();
            } else {
                let last: T | undefined = this.data.pop();

                if (last === undefined) {
                    throw Error();
                }

                this.data[i] = last;

                this.heapifyDown(i);
            }

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
            return this.data[i];
        } else {
            return undefined;
        }
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        yield* this.data;
    }

    /**
     * See parent documentation.
     */
    size(): number {
        return this.data.length;
    }

    /**
     * See parent documentation.
     */
    toString(): string {
        return `[${this.data.toString()}]`;
    }

    /**
     * The function to use when comparing values in _this_.
     */
    private readonly compare: Comparator<T>;

    /**
     * An array-based heap.
     */
    private data: T[];

    /**
     * @return the index of the given value in _this_.data,
     * or -1 if it is not found
     */
    private indexOf(value: T): number {
        for (let i: number = 0; i < this.data.length; ++i) {
            if (this.compare(this.data[i], value) == 0) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Performs a heapify down operation, starting from a given position.
     * @param i the index of the starting position in _this_.data
     */
    private heapifyDown(i: number): void {
        while (true) {
            let iLeft: number = indexLeft(i);
            let iRight: number = indexRight(i);

            if (iLeft >= this.data.length) { // leaf node
                break;
            }

            let rightSmaller: boolean = iRight < this.data.length
                && this.compare(this.data[iRight], this.data[iLeft]) < 0;

            if (!rightSmaller && this.compare(this.data[iLeft], this.data[i]) < 0) {
                [this.data[i], this.data[iLeft]] = [this.data[iLeft], this.data[i]];
                i = iLeft;
            } else if (rightSmaller
                       && this.compare(this.data[iRight], this.data[i]) < 0) {
                [this.data[i], this.data[iRight]] = [this.data[iRight], this.data[i]];
                i = iRight;
            } else {
                break;
            }
        }
    }

    /**
     * Performs a heapify up operation, starting from a given position.
     * @param i the index of the starting position in _this_.data
     */
    private heapifyUp(i: number): void {
        let iParent: number = indexParent(i);

        while (i > 0 && this.compare(this.data[i], this.data[iParent]) < 0) {
            [this.data[i], this.data[iParent]] = [this.data[iParent], this.data[i]];

            i = iParent;
            iParent = indexParent(i);
        }
    }
}

/**
 * Calculates the equivalent left child index of a given index.
 * @param index the index
 * @return the left child index
 */
function indexLeft(index: number): number {
    return 2 * index + 1;
}

/**
 * Calculates the equivalent parent index of a given index.
 * @param index the index
 * @return the parent index
 */
function indexParent(index: number): number {
    return (index & 1) == 0 ? (index - 2) / 2 : (index - 1) / 2;
}

/**
 * Calculates the equivalent right child index of a given index.
 * @param index the index
 * @return the right child index
 */
function indexRight(index: number): number {
    return 2 * index + 2;
}
