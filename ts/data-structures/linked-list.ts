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
        if (this.last == null) {
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
        if (this.head == null) {
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
        if (this.last == null) {
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
        if (this.head == null) {
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
            link(this.last!, node);
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
            link(node, this.head!);
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

            link(node.previous!, newNode);
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
    erase(value: T): boolean {
        let i: number = 0;
        let node: LLNode<T> | null = this.head;

        while (node != null) {
            if (this.equal(node.value, value)) {
                this.eraseAt(i);
                return true;
            }

            ++i;

            node = node.next;
        }

        return false;
    }

    /**
     * See parent documentation.
     */
    eraseAt(index: number): T {
        let node: LLNode<T> = this.nodeAt(index);

        if (node == this.head && node == this.last) { // single-element list
            this.head = null;
            this.last = null;
        } else if (node == this.head) { // node.previous == null
            this.head = this.head.next!;
            unlink(node, node.next!);
        } else if (node == this.last) { // node.next == null
            this.last = this.last.previous!;
            unlink(node.previous!, node);
        } else {
            let previous: LLNode<T> = node.previous!;
            let next: LLNode<T> = node.next!;

            unlink(previous, node);
            unlink(node, next);
            link(previous, next);
        }

        return node.value;
    }

    /**
     * See parent documentation.
     */
    find(value: T): T | undefined {
        let node: LLNode<T> | null = this.head;

        while (node != null) {
            if (this.equal(node.value, value)) {
                return node.value;
            }

            node = node.next;
        }

        return undefined;
    }

    /**
     * See parent documentation.
     */
    *iterator(): Iterator<T> {
        let node: LLNode<T> | null = this.head;

        while (node != null) {
            yield node.value;

            node = node.next;
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        let size: number = 0;
        let node: LLNode<T> | null = this.head;

        while (node != null) {
            ++size;
            node = node.next;
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
    update(index: number, value: T): T {
        let node: LLNode<T> = this.nodeAt(index);
        let oldValue: T = node.value;

        this.nodeAt(index).value = value;

        return oldValue;
    }

    /**
     * The function to use when checking if two values are equal.
     */
    private readonly equal: Equality<T>;

    /**
     * The first node in _this_.
     */
    private head: LLNode<T> | null;

    /**
     * The last node in _this_.
     */
    private last: LLNode<T> | null;

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

        let node: LLNode<T> | null = this.head;
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
    next: LLNode<T> | null;

    /**
     * The previous node from _this_.
     */
    previous: LLNode<T> | null;

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
    constructor(value: T,
                previous: LLNode<T> | null = null,
                next: LLNode<T> | null = null) {
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
