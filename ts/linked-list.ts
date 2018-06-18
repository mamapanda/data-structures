import { List, Equality, defaultEquality } from './collection';

export class LinkedList<T> extends List<T> {
    constructor(equal: Equality<T> = defaultEquality) {
        super();

        this.head = null;
        this.last = null;
        this.equal = equal;
    }

    peekBack(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.last.value;
    }

    peekFront(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.head.value;
    }

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

    add(value: T): void {
        this.pushBack(value);
    }

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

    at(index: number): T {
        return this.nodeAt(index).value;
    }

    clear(): void {
        this.head = null;
        this.last = null;
    }

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

    eraseAt(index: number): void {
        let node: LLNode<T> = this.nodeAt(index);

        let previous: LLNode<T> = node.previous;
        let next: LLNode<T> = node.next;

        if (node == this.head) { // node.previous == null
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

    find(value: T): boolean {
        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            if (this.equal(node.value, value)) {
                return true;
            }
        }

        return false;
    }

    *iterator(): Iterator<T> {
        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            yield node.value;
        }
    }

    size(): number {
        let size: number = 0;

        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            ++size;
        }

        return size;
    }

    toString(): string {
        if (this.head == null) {
            return '[]';
        }

        let str: string = `[${this.head.value.toString()}`;

        for (let node: LLNode<T> = this.head.next; node != null; node = node.next) {
            str += `,${node.value.toString()}`;
        }

        return str + ']';
    }

    private equal: Equality<T>;
    private head: LLNode<T>;
    private last: LLNode<T>;

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

class LLNode<T> {
    next: LLNode<T>;
    previous: LLNode<T>;
    value: T;

    constructor(value: T, previous: LLNode<T> = null, next: LLNode<T> = null) {
        this.next = next;
        this.previous = previous;
        this.value = value;
    }
}

function link<T>(lhs: LLNode<T>, rhs: LLNode<T>): void {
    lhs.next = rhs;
    rhs.previous = lhs;
}

function unlink<T>(lhs: LLNode<T>, rhs: LLNode<T>): void {
    if (lhs.next != rhs || rhs.previous != lhs) {
        throw Error();
    }

    lhs.next = null;
    rhs.previous = null;
}
