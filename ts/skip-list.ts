import { Indexable, Comparator, defaultCompare } from './collection';

export class SkipList<T> extends Indexable<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.head = new SLNode<T>(null, [null]);
    }

    add(value: T): void {
        let level: number = randomLevel(0.5);
        let node: SLNode<T> = new SLNode<T>(value, new Array(level + 1));

        let previousList: SLNode<T>[] = this.previousOf(value);

        for (let i: number = 0; i <= level; ++i) {
            let previous: SLNode<T> = previousList[i];
            let next: SLNode<T> = previous.next[i];

            previous.next[i] = node;
            node.next[i] = next;
        }
    }

    at(index: number): T {
        return this.nodeAt(index).value;
    }

    clear(): void {
        this.head.next = [null];
    }

    erase(value: T): void {
        this.previousOf(value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;
            let current: SLNode<T> = previous.next[level];

            if (current != null && this.compare(value, current.value) == 0) {
                previous.next[level] = current.next[level];
            }
        });
    }

    eraseAt(index: number): void {
        let node: SLNode<T> = this.nodeAt(index);

        this.previousOf(node.value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;

            if (previous.next[level] == node) {
                previous.next[level] = node.next[level];
            }
        });
    }

    find(value: T): boolean {
        let previous: SLNode<T> = this.previousOf(value)[0];
        let node: SLNode<T> = previous.next[0];

        return node != null && this.compare(node.value, value) == 0;
    }

    *iterator(): Iterator<T> {
        let node: SLNode<T> = this.head.next[0];

        while (node != null) {
            yield node.value;

            node = node.next[0];
        }
    }

    size(): number {
        let size: number = 0;

        for (let x of this) {
            ++size;
        }

        return size;
    }

    toString(): string {
        return `[${this.toArray().toString()}]`;
    }

    private compare: Comparator<T>;
    private head: SLNode<T>; // null head

    private nodeAt(index: number): SLNode<T> {
        if (index < 0 || index >= this.size()) {
            throw Error();
        }

        let node: SLNode<T> = this.head;

        // technically, this.head's index is -1
        for (let i: number = -1; i != index; ++i) {
            node = node.next[0];
        }

        return node;
    }

    // Returns a list of nodes, where list[i] is the last node in level i
    // with node.value < value. If the level is empty, list[i] is this.head.
    private previousOf(value: T): SLNode<T>[] {
        let previousList: SLNode<T>[] = new Array(this.head.level() + 1);
        let previous: SLNode<T> = this.head;

        for (let level: number = this.head.level(); level >= 0; --level) {
            let current: SLNode<T> = previous.next[level];

            while (current != null && this.compare(current.value, value) < 0) {
                previous = current;
                current = current.next[level];
            }

            previousList[level] = previous;
        }

        return previousList;
    }
}

class SLNode<T> {
    next: SLNode<T>[];
    value: T;

    constructor(value: T, next: SLNode<T>[]) {
        this.next = next;
        this.value = value;
    }

    level(): number {
        return this.next.length - 1;
    }
}

function randomLevel(probability: number): number {
    if (probability < 0 || probability >= 1) {
        throw Error();
    }

    let level: number = 0;

    while (Math.random() < probability) {
        ++level;
    }

    return level;
}
