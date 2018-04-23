import { BiIterator, List, ListIterator } from './collection';

export class LinkedList<T> extends List<T> {
    constructor() {
        super();
        this.head = null;
        this.last = null;
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

    addAt(position: ListIterator<T> | number, value: T): void {
        let node: LLNode<T>;

        try {
            node = this.nodeAt(position);
        } catch (e) {
            let atEnd: boolean = (typeof position == 'object' && !position.valid())
                || (typeof position == 'number' && position == this.size());

            if (atEnd) {
                this.pushBack(value);
                return;
            } else {
                throw e;
            }
        }

        if (node == this.head) {
            this.pushFront(value);
        } else {
            let newNode: LLNode<T> = new LLNode<T>(value);

            link(node.previous, newNode);
            link(newNode, node);
        }
    }

    at(index: number): T {
        return this.nodeAt(index).value;
    }

    clear(): void {
        this.head = null;
        this.last = null;
    }

    eraseAt(position: BiIterator<T> | number): void {
        let node: LLNode<T> = this.nodeAt(position);

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

    find(value: T): BiIterator<T> {
        for (let node: LLNode<T> = this.head; node != null; node = node.next) {
            if (node.value == value) {
                return new LLIterator<T>(node, this);
            }
        }

        return null;
    }

    iterator(): ListIterator<T> {
        return new LLIterator<T>(this.head, this);
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

    private head: LLNode<T>;
    private last: LLNode<T>;

    private nodeAt(position: BiIterator<T> | number): LLNode<T> {
        if (typeof position == 'number') {
            return this.nodeAtIndex(position);
        } else {
            if (!this.validate(position)) {
                throw Error();
            }

            return (position as LLIterator<T>).node();
        }
    }

    private nodeAtIndex(index: number): LLNode<T> {
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

class LLIterator<T> implements ListIterator<T> {
    constructor(node: LLNode<T>, list: LinkedList<T>) {
        this.currentNode = node;
        this.list = list;
    }

    node(): LLNode<T> {
        return this.currentNode;
    }

    back(): void {
        if (!this.valid()) {
            throw Error();
        }

        this.currentNode = this.currentNode.previous;
    }

    forward(): void {
        if (!this.valid()) {
            throw Error();
        }

        this.currentNode = this.currentNode.next;
    }

    hasNext(): boolean {
        if (!this.valid()) {
            return false;
        }

        return this.currentNode.next != null;
    }

    hasPrevious(): boolean {
        if (!this.valid()) {
            return false;
        }

        return this.currentNode.previous != null;
    }

    setValue(value: T): void {
        if (!this.valid()) {
            throw Error();
        }

        this.currentNode.value = value;
    }

    source(): List<T> {
        return this.list;
    }

    valid(): boolean {
        return this.currentNode != null;
    }

    value(): T {
        if (!this.valid()) {
            throw Error();
        }

        return this.currentNode.value;
    }

    private currentNode: LLNode<T>;
    private list: LinkedList<T>;
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
