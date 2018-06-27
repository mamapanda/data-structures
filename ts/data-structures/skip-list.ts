import { Indexable, Comparator, defaultCompare } from './collection';

/**
 * A skip list.
 */
export class SkipList<T> extends Indexable<T> {
    /**
     * The constructor.
     * @param compare the function to use when comparing two values in _this_
     */
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.head = new SLNode<T>(null, [null]);
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        let level: number = randomLevel(0.5);
        let node: SLNode<T> = new SLNode<T>(value, new Array(level + 1));

        let previousList: SLNode<T>[] = this.previousOf(value);

        // nodes with level <= this.head.level()
        for (let i: number = 0; i <= Math.min(level, this.head.level()); ++i) {
            let previous: SLNode<T> = previousList[i];
            let next: SLNode<T> = previous.next[i];

            previous.next[i] = node;
            node.next[i] = next;
        }

        // nodes with level > this.head.level()
        for (let i: number = this.head.level() + 1; i <= level; ++i) {
            this.head.next.push(node);
            node.next[i] = null;
        }
    }

    /**
     * See parent documentation.
     */
    at(index: number): T {
        return this.nodeAt(index).value;
    }

    /**
     * See parent documentation.
     */
    clear(): void {
        this.head.next = [null];
    }

    /**
     * See parent documentation.
     */
    empty(): boolean {
        return this.head.next.every(x => x == null);
    }

    /**
     * See parent documentation.
     */
    erase(value: T): void {
        this.previousOf(value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;
            let current: SLNode<T> = previous.next[level];

            if (current != null && this.compare(value, current.value) == 0) {
                previous.next[level] = current.next[level];
            }
        });
    }

    /**
     * See parent documentation.
     */
    eraseAt(index: number): void {
        let node: SLNode<T> = this.nodeAt(index);

        this.previousOf(node.value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;

            if (previous.next[level] == node) {
                previous.next[level] = node.next[level];
            }
        });
    }

    /**
     * See parent documentation.
     */
    find(value: T): boolean {
        let previous: SLNode<T> = this.previousOf(value)[0];
        let node: SLNode<T> = previous.next[0];

        return node != null && this.compare(node.value, value) == 0;
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        let node: SLNode<T> = this.head.next[0];

        while (node != null) {
            yield node.value;

            node = node.next[0];
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        let size: number = 0;

        for (let x of this) {
            ++size;
        }

        return size;
    }

    /**
     * See parent documentation.
     */
    toString(): string {
        return `[${this.toArray().toString()}]`;
    }

    /**
     * The function to use when comparing two values.
     */
    private compare: Comparator<T>;

    /**
     * The null head node of _this_.
     */
    private head: SLNode<T>;

    /**
     * Finds the node at the given index. An error is thrown
     * if the index is out of bounds.
     * @param index the index
     * @return the node at the given index
     */
    private nodeAt(index: number): SLNode<T> {
        if (index < 0) {
            throw Error();
        }

        let node: SLNode<T> = this.head;

        // technically, this.head's index is -1
        for (let i: number = -1; i != index; ++i) {
            node = node.next[0];

            if (node == null) { // hit end of list before reaching index
                throw Error();
            }
        }

        return node;
    }

    /**
     * For each level, find the last node such that the node's value is less
     * than the given value.
     * @param value the value
     * @return a list of the nodes, such that list[i] is the relevant node
     * in the ith level, or _this_.head if there is no such node.
     */
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

/**
 * A skip list node.
 */
class SLNode<T> {
    /**
     * A list of successor nodes, such that next[i] gives the
     * successor of _this_ at the ith level of the list.
     */
    next: SLNode<T>[];

    /**
     * The value contained in _this_.
     */
    value: T;

    /**
     * The constructor.
     * @param value the value to store in _this_
     * @param next the successors of _this_
     */
    constructor(value: T, next: SLNode<T>[]) {
        this.next = next;
        this.value = value;
    }

    /**
     * @return the highest level that _this_ reaches
     */
    level(): number {
        return this.next.length - 1;
    }
}

/**
 * Calculates a random maximum level using Math.random
 * and the given level promotion probability.
 * @param probability the level promotion probability
 * @return a random maximum level
 */
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
