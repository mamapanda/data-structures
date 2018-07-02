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
        this.head = SLNode.nullHead();
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        let level: number = randomLevel(0.5);
        let node: SLNode<T> = SLNode.with(value, new Array(level + 1));

        let previousList: SLNode<T>[] = this.previousOf(value);

        // nodes with level <= this.head.level()
        for (let i: number = 0; i <= Math.min(level, this.head.level()); ++i) {
            let previous: SLNode<T> = previousList[i];
            let next: SLNode<T> | null = previous.next[i];

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
        let node: SLNode<T> = this.nodeAt(index);

        if (node.value === undefined) {
            throw Error();
        }

        return node.value;
    }

    /**
     * See parent documentation.
     */
    clear(): void {
        this.head = SLNode.nullHead();
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
    erase(value: T): boolean {
        let found: boolean = false;

        this.previousOf(value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;
            let current: SLNode<T> | null = previous.next[level];

            if (current) {
                if (current.value === undefined) {
                    throw Error();
                }

                if (this.compare(value, current.value) == 0) {
                    previous.next[level] = current.next[level];

                    found = true;
                }
            }
        });

        return found;
    }

    /**
     * See parent documentation.
     */
    eraseAt(index: number): T {
        let node: SLNode<T> = this.nodeAt(index);

        if (node.value === undefined) {
            throw Error();
        }

        this.previousOf(node.value).forEach((previous: SLNode<T>, i: number) => {
            let level: number = i;

            if (previous.next[level] == node) {
                previous.next[level] = node.next[level];
            }
        });

        return node.value;
    }

    /**
     * See parent documentation.
     */
    find(value: T): T | undefined {
        let previous: SLNode<T> = this.previousOf(value)[0];
        let node: SLNode<T> | null = previous.next[0];

        if (node) {
            if (node.value === undefined) {
                throw Error();
            }

            if (this.compare(node.value, value) == 0) {
                return node.value;
            }
        }

        return undefined;
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        let node: SLNode<T> | null = this.head.next[0];

        while (node) {
            if (node.value === undefined) {
                throw Error();
            }

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
    private readonly compare: Comparator<T>;

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

        let node: SLNode<T> | null = this.head;

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
            let current: SLNode<T> | null = previous.next[level];

            while (current) {
                if (current.value === undefined) {
                    throw Error();
                }

                if (this.compare(current.value, value) < 0) {
                    previous = current;
                    current = current.next[level];
                } else {
                    break;
                }
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
    next: (SLNode<T> | null)[];

    /**
     * The value contained in _this_.
     * It is undefined if _this_ is the null head node.
     */
    value: T | undefined;

    /**
     * @return the highest level that _this_ reaches
     */
    level(): number {
        return this.next.length - 1;
    }

    /**
     * Creates a new null head node.
     * @return the null head node
     */
    static nullHead<T>(): SLNode<T> {
        return new SLNode<T>(undefined, [null]);
    }

    /**
     * Creates a new SLNode with the given value and successors.
     * @param value the value
     * @param next the successors
     * @return a new SLNode
     */
    static with<T>(value: T, next: (SLNode<T> | null)[]): SLNode<T> {
        return new SLNode<T>(value, next);
    }

    /**
     * The constructor. Use nullHead and with instead of the constructor.
     * @param value the value to store in _this_
     * @param next the successors of _this_
     */
    private constructor(value: T | undefined, next: (SLNode<T> | null)[]) {
        this.next = next;
        this.value = value;
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
