import { Collection, BiIterator, Comparator, defaultCompare } from './collection'

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
        this.eraseAt(this.iterator());

        return min;
    }

    add(value: T): void {
        this.data.push(value);
        this.heapifyUp(this.data.length - 1);
    }

    clear(): void {
        this.data = [];
    }

    eraseAt(position: BiIterator<T>): void {
        if (!this.validate(position)) {
            throw Error();
        }

        let it: BHeapIterator<T> = position as BHeapIterator<T>;

        this.data[it.index()] = this.data.pop();

        this.heapifyDown(it.index());
    }

    find(value: T): BiIterator<T> {
        for (let i: number = 0; i < this.data.length; ++i) {
            if (this.compare(this.data[i], value) == 0) {
                return new BHeapIterator<T>(i, this.data, this);
            }
        }

        return null;
    }

    iterator(): BiIterator<T> {
        return new BHeapIterator<T>(0, this.data, this);
    }

    size(): number {
        return this.data.length;
    }

    toString(): string {
        return this.data.toString();
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

    private compare: Comparator<T>;
    private data: T[];
}

class BHeapIterator<T> implements BiIterator<T> {
    constructor(index: number, data: T[], heap: BinaryHeap<T>) {
        this.currentIndex = index;
        this.data = data;
        this.heap = heap;
    }

    index(): number {
        return this.currentIndex;
    }

    back(): void {
        --this.currentIndex;
    }

    forward(): void {
        ++this.currentIndex;
    }

    hasNext(): boolean {
        return this.valid() && this.currentIndex + 1 <= this.data.length;
    }

    hasPrevious(): boolean {
        return this.valid() && this.currentIndex - 1 >= 0;
    }

    source(): Collection<T> {
        return this.heap;
    }

    valid(): boolean {
        return 0 <= this.currentIndex && this.currentIndex < this.data.length;
    }

    value(): T {
        if (!this.valid()) {
            throw Error();
        }

        return this.data[this.currentIndex];
    }

    private currentIndex: number;
    private data: T[];
    private heap: BinaryHeap<T>;
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
