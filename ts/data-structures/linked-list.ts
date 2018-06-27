import { List, Equality, defaultEquality } from './collection';

/**
 * A linked list implementation.
 */
export class LinkedList<T> extends List<T> {
    /**
     * The constructor.
     * @param equal the function to use to check if two values are equal
     */
    constructor(equal: Equality<T> = defaultEquality) {
        super();

        this.head = null;
        this.last = null;
        this.equal = equal;
    }

    /**
     * Finds the last value in _this_. An error is thrown if _this_
     * is empty.
     * @return the last value
     */
    peekBack(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.last.value;
    }

    /**
     * Finds the first value in _this_. An error is thrown if _this_
     * is empty.
     * @return the first value
     */
    peekFront(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.head.value;
    }

    /**
     * Removes the last value in _this_. An error is thrown if _this_
     * is empty.
     * @return the removed value
     */
    popBack(): T {
        if (this.empty()) {
            throw Error();
        }

        let oldLast: LLNode<T> = this.last;

        this.last = this.last.previous;

        if (this.last != null) {
            unlink(this.last, oldLast);
        } else {
            this.head = null;
        }

        return oldLast.value;
    }

    /**
     * Removes the first value in _this_. An error is thrown if _this_
     * is empty.
     * @return the removed value
     */
    popFront(): T {
        if (this.empty()) {
            throw Error();
        }

        let oldHead: LLNode<T> = this.head;

        this.head = this.head.next;

        if (this.head != null) {
            unlink(oldHead, this.head);
        } else {
            this.last = null;
        }

        return oldHead.value;
    }

    /**
     * Adds a value to the end of _this_.
     */
    pushBack(value: T): void {
        let node: LLNode<T> = new LLNode<T>(value);

        if (this.empty()) {
            this.head = node;
            this.last = node;
        } else {
            link(this.last, node);
            this.last = node;
        }
    }

    /**
     * Adds a value to the beginning of _this_.
     */
    pushFront(value: T): void {
        let node: LLNode<T> = new LLNode<T>(value);

        if (this.empty()) {
            this.head = node;
            this.last = node;
        } else {
            link(node, this.head);
            this.head = node;
        }
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        this.pushBack(value);
    }

    /**
     * See parent documentation.
     */
    addAt(index: number, value: T): void {
        let node: LLNode<T>;
        let currentSize: number = this.size();

        if (index == 0) {
            this.pushFront(value);
        } else if (index < currentSize) {
            let node: LLNode<T> = this.nodeAt(index);
            let newNode: LLNode<T> = new LLNode<T>(value);

            link(node.previous, newNode);
            link(newNode, node);
        } else if (index == currentSize) {
            this.pushBack(value);
        } else {
            throw Error();
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
        this.head = null;
        this.last = null;
    }

    /**
     * See parent documentation.
     */
    empty(): boolean {
        return this.head == null && this.last == null;
    }

    /**
     * See parent documentation.
     */
    erase(value: T): void {
        let i: number = 0;

        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            if (this.equal(node.value, value)) {
                this.eraseAt(i);
                break;
            }

            ++i;
        }
    }

    /**
     * See parent documentation.
     */
    eraseAt(index: number): void {
        let node: LLNode<T> = this.nodeAt(index);

        let previous: LLNode<T> = node.previous;
        let next: LLNode<T> = node.next;

        if (node == this.head && node == this.last) { // single-element list
            this.head = null;
            this.last = null;
        } else if (node == this.head) { // node.previous == null
            if (next != null) {
                unlink(node, next);
            }
            this.head = next;
        } else if (node == this.last) { // node.next == null
            if (previous != null) {
                unlink(previous, node);
            }
            this.last = previous;
        } else {
            unlink(previous, node);
            unlink(node, next);
            link(previous, next);
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): boolean {
        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            if (this.equal(node.value, value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            yield node.value;
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        let size: number = 0;

        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
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
     * See parent documentation.
     */
    update(index: number, value: T): void {
        this.nodeAt(index).value = value;
    }

    /**
     * The function to use when checking if two values are equal.
     */
    private equal: Equality<T>;

    /**
     * The first node in _this_.
     */
    private head: LLNode<T>;

    /**
     * The last node in _this_.
     */
    private last: LLNode<T>;

    /**
     * Finds the node at the given index. An error is thrown if
     * the index is out of bounds.
     * @param index the index
     * @return the node at the given index
     */
    private nodeAt(index: number): LLNode<T> {
        if (index < 0) {
            throw Error();
        }

        let node: LLNode<T> = this.head;
        let i: number = 0;

        while (i < index && node != null) {
            ++i;
            node = node.next;
        }

        if (node == null) {
            throw Error();
        }

        return node;
    }
}

/**
 * A linked list node.
 */
class LLNode<T> {
    /**
     * The next node from _this_.
     */
    next: LLNode<T>;

    /**
     * The previous node from _this_.
     */
    previous: LLNode<T>;

    /**
     * The value contained in _this_.
     */
    value: T;

    /**
     * the constructor.
     * @param value the value to store in _this_
     * @param previous the predecessor of _this_
     * @param next the successor of _this_
     */
    constructor(value: T, previous: LLNode<T> = null, next: LLNode<T> = null) {
        this.next = next;
        this.previous = previous;
        this.value = value;
    }
}

/**
 * Links two nodes.
 * @param lhs the first of the two nodes
 * @param rhs the second of the two nodes
 */
function link<T>(lhs: LLNode<T>, rhs: LLNode<T>): void {
    lhs.next = rhs;
    rhs.previous = lhs;
}

/**
 * Unlinks two nodes.
 * @param lhs the first of the two nodes
 * @param rhs the second of the two nodes
 */
function unlink<T>(lhs: LLNode<T>, rhs: LLNode<T>): void {
    if (lhs.next != rhs || rhs.previous != lhs) {
        throw Error();
    }

    lhs.next = null;
    rhs.previous = null;
}
