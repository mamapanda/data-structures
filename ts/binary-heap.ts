import { Collection, Comparator, defaultCompare } from './collection'

export class BinaryHeap<T> extends Collection<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.data = [];
    }

    min(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.data[0];
    }

    popMin(): T {
        if (this.empty()) {
            throw Error();
        }

        let min: T = this.data[0];
        this.erase(min);

        return min;
    }

    add(value: T): void {
        this.data.push(value);
        this.heapifyUp(this.data.length - 1);
    }

    clear(): void {
        this.data = [];
    }

    erase(value: T): void {
        let i: number = this.indexOf(value);

        if (i >= 0) {
            if (i == this.data.length - 1) { // last element
                this.data.pop();
            } else {
                this.data[i] = this.data.pop();

                this.heapifyDown(i);
            }
        }
    }

    find(value: T): boolean {
        return this.indexOf(value) >= 0;
    }

    size(): number {
        return this.data.length;
    }

    toString(): string {
        return `[${this.data.toString()}]`;
    }

    *[Symbol.iterator](): Iterator<T> {
        yield* this.data;
    }

    private compare: Comparator<T>;
    private data: T[];

    private indexOf(value: T): number {
        for (let i: number = 0; i < this.data.length; ++i) {
            if (this.compare(this.data[i], value) == 0) {
                return i;
            }
        }

        return -1;
    }

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

    private heapifyUp(i: number): void {
        let iParent: number = indexParent(i);

        while (i > 0 && this.compare(this.data[i], this.data[iParent]) < 0) {
            [this.data[i], this.data[iParent]] = [this.data[iParent], this.data[i]];

            i = iParent;
            iParent = indexParent(i);
        }
    }
}

function indexLeft(index: number): number {
    return 2 * index + 1;
}

function indexParent(index: number): number {
    return (index & 1) == 0 ? (index - 2) / 2 : (index - 1) / 2;
}

function indexRight(index: number): number {
    return 2 * index + 2;
}
