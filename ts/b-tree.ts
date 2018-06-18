import { Collection, Comparator, defaultCompare } from './collection';

export class BTree<T> extends Collection<T> {
    constructor(minDegree: number, compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.minDegree = minDegree;
        this.root = new BNode<T>(true);
    }

    max(): T {
        let node: BNode<T> = this.root.rightmost();

        if (node.values.length > 0) {
            return node.values[node.values.length - 1];
        } else {
            throw Error();
        }
    }

    min(): T {
        let node: BNode<T> = this.root.leftmost();

        if (node.values.length > 0) {
            return node.values[0];
        } else {
            throw Error();
        }
    }

    add(value: T): void {
        if (this.empty()) {
            this.root.values.push(value);
        }

        let node: BNode<T> = this.root;
        let i: number;
        let cmpResult: number;

        while (true) { // find leaf node to insert into
            i = binarySearch(node, value, this.compare);
            cmpResult = this.compare(value, node.values[i]);

            if (cmpResult == 0) {
                return; // element already exists in tree
            } else if (node.leaf()) {
                break;
            } else if (cmpResult < 0) {
                node = node.children[i];
            } else {
                node = node.children[i + 1];
            }
        }

        if (cmpResult > 0) {
            ++i;
        }

        node.values.splice(i, 0, value);

        this.rebalanceOver(node);
    }

    clear(): void {
        this.root = new BNode<T>(true);
    }

    erase(value: T): void {
        let node: BNode<T>;
        let i: number;

        [node, i] = this.findLocation(value);

        if (node != null) {
            if (node.leaf()) {
                node.values.splice(i, 1);
                this.rebalanceUnder(node);
            } else {
                let rightmost: BNode<T> = node.children[i].rightmost();

                node.values[i] = rightmost.values.pop();
                this.rebalanceUnder(rightmost);
            }
        }
    }

    find(value: T): boolean {
        return this.findLocation(value)[0] != null;
    }

    iterator(): Iterator<T> {
        return iterate(this.root);
    }

    size(): number {
        return this.sizeOf(this.root);
    }

    toString(): string {
        return `<${this.root.toString()}>`
    }

    private compare: Comparator<T>;
    private minDegree: number;
    private root: BNode<T>;

    private findLocation(value: T): [BNode<T>, number] {
        if (this.empty()) {
            return [null, -1];
        }

        let node: BNode<T> = this.root;

        while (true) {
            let i: number = binarySearch(node, value, this.compare);
            let cmpResult: number = this.compare(value, node.values[i]);

            if (cmpResult == 0) {
                return [node, i];
            } else if (node.leaf()) {
                return [null, -1];
            } else if (cmpResult < 0) {
                node = node.children[i];
            } else {
                node = node.children[i + 1];
            }
        }
    }

    private merge(left: BNode<T>, right: BNode<T>, leftIndex: number): void {
        let separator: T = left.parent.values.splice(leftIndex, 1)[0];

        left.values.push(separator);
        left.values.push(...right.values);

        if (!left.leaf()) {
            left.children.push(...right.children);
            right.children.forEach(n => n.parent = left);
        }

        left.parent.children.splice(leftIndex + 1, 1); // remove right
    }

    private rebalanceOver(node: BNode<T>): void {
        if (node.values.length > 2 * this.minDegree - 1) {
            let left: BNode<T>;
            let right: BNode<T>;
            let separator: T;

            [separator, left, right] = this.split(node);

            if (node == this.root) {
                this.root = new BNode<T>(false);
                this.root.values.push(separator);
                this.root.children.push(left, right);
                left.parent = this.root;
                right.parent = this.root;
            } else {
                let i: number = binarySearch(node.parent, separator, this.compare);

                if (this.compare(separator, node.parent.values[i]) > 0) {
                    ++i;
                }

                node.parent.values.splice(i, 0, separator);
                node.parent.children.splice(i, 1, left, right); // delete node as well
                left.parent = node.parent;
                right.parent = node.parent;

                this.rebalanceOver(node.parent);
            }
        }
    }

    private rebalanceUnder(node: BNode<T>): void {
        if (node != this.root && node.values.length < this.minDegree - 1) {
            if (!this.tryRotateLeft(node) && !this.tryRotateRight(node)) {
                let leftSibling: BNode<T> = node.leftSibling();
                let i: number = node.parent.children.indexOf(node);

                if (leftSibling != null) { // merge node into left sibling
                    this.merge(leftSibling, node, i - 1);
                } else { // merge right sibling into node
                    this.merge(node, node.rightSibling(), i);
                }

                this.rebalanceUnder(node.parent);
            }
        } else if (node == this.root && node.values.length == 0) {
            if (!this.root.leaf()) { // should have been a merge step
                if (this.root.children.length != 1) {
                    throw Error();
                }

                this.root = this.root.children[0];
            }
        }
        console.log(this.toString());
    }

    private sizeOf(node: BNode<T>): number {
        let size: number = node.values.length;

        if (!node.leaf()) {
            for (let i: number = 0; i < node.children.length; ++i) {
                size += this.sizeOf(node.children[i]);
            }
        }

        return size;
    }

    private split(node: BNode<T>): [T, BNode<T>, BNode<T>] {
        let left: BNode<T> = node;
        let right: BNode<T> = new BNode<T>(left.leaf());

        right.values = left.values.splice(this.minDegree + 1,
                                          left.values.length);
        if (!left.leaf()) {
            right.children = left.children.splice(this.minDegree + 1,
                                                  left.children.length);
            right.children.forEach(n => n.parent = right);
        }

        let separator: T = left.values.pop();

        return [separator, left, right];
    }

    private tryRotateLeft(node: BNode<T>): boolean {
        let sibling: BNode<T> = node.rightSibling();

        if (sibling != null && sibling.values.length > this.minDegree - 1) {
            let i: number = node.parent.children.indexOf(node);

            node.values.push(node.parent.values[i]);
            node.parent.values[i] = sibling.values.splice(0, 1)[0];

            if (!node.leaf()) {
                node.children.push(sibling.children.splice(0, 1)[0]);
            }

            return true;
        } else {
            return false;
        }
    }

    private tryRotateRight(node: BNode<T>): boolean {
        let sibling: BNode<T> = node.leftSibling();

        if (sibling != null && sibling.values.length > this.minDegree - 1) {
            let i: number = node.parent.children.indexOf(node);

            node.values.splice(0, 0, node.parent.values[i - 1]);
            node.parent.values[i - 1] = sibling.values.pop();

            if (!node.leaf()) {
                node.children.splice(0, 0, sibling.children.pop());
            }

            return true;
        } else {
            return false;
        }
    }
}

class BNode<T> {
    children: BNode<T>[];
    parent: BNode<T>;
    values: T[];

    constructor(leaf: boolean) {
        this.children = leaf ? null : [];
        this.parent = null;
        this.values = [];
    }

    leaf(): boolean {
        return this.children == null;
    }

    leftmost(): BNode<T> {
        let node: BNode<T> = this;

        while (node.children != null) {
            node = node.children[0];
        }

        return node;
    }

    leftSibling(): BNode<T> {
        let i: number = this.parent.children.indexOf(this);

        if (i < 0) {
            throw Error();
        }

        return i == 0 ? null : this.parent.children[i - 1];
    }

    rightmost(): BNode<T> {
        let node: BNode<T> = this;

        while (node.children != null) {
            node = node.children[node.children.length - 1];
        }

        return node;
    }

    rightSibling(): BNode<T> {
        let i: number = this.parent.children.indexOf(this);

        if (i < 0) {
            throw Error();
        }

        if (i == this.parent.children.length - 1) {
            return null;
        } else {
            return this.parent.children[i + 1];
        }
    }

    toString(): string {
        let str: string = `(${this.values.toString()})`;

        if (!this.leaf()) {
            for (let child of this.children) {
                str += `[${child.toString()}]`;
            }
        }

        return str;
    }
}

// Returns index of x if found. Otherwise, returns index of last element checked.
function binarySearch<T>(node: BNode<T>, x: T, compare: Comparator<T>): number {
    let low: number = 0;
    let high: number = node.values.length - 1;
    let mid: number;

    while (low <= high) {
        mid = Math.floor((low + high) / 2);

        let result: number = compare(x, node.values[mid]);

        if (result < 0) {
            high = mid - 1;
        } else if (result == 0) {
            return mid; // x found
        } else {
            low = mid + 1;
        }
    }

    return mid; // x not found
}

function* iterate<T>(node: BNode<T>): Iterator<T> {
    if (node.leaf()) {
        yield* node.values;
    } else {
        yield* iterate(node.children[0])[Symbol.iterator]();

        for (let i: number = 0; i < node.values.length; ++i) {
            yield node.values[i];
            yield* iterate(node.children[i + 1])[Symbol.iterator]();
        }
    }
}
