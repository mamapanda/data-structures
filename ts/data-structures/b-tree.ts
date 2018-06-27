import { Collection, Comparator, defaultCompare } from './collection';

/**
 * A B-tree.
 */
export class BTree<T> extends Collection<T> {
    /**
     * The constructor.
     * @param minDegree the minimum degree of _this_
     * @param compare the function to use when comparing values in _this_
     */
    constructor(minDegree: number, compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.minDegree = minDegree;
        this.root = new BNode<T>(true);
    }

    /**
     * Finds the maximum value in _this_. An error is thrown if _this_ is empty.
     * @return the maximum value
     */
    max(): T {
        let node: BNode<T> = this.root.rightmost();

        if (node.values.length > 0) {
            return node.values[node.values.length - 1];
        } else {
            throw Error();
        }
    }

    /**
     * Finds the minimum value in _this_. An error is thrown if _this_ is empty.
     * @return the minimum value
     */
    min(): T {
        let node: BNode<T> = this.root.leftmost();

        if (node.values.length > 0) {
            return node.values[0];
        } else {
            throw Error();
        }
    }

    /**
     * See parent documentation.
     */
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

    /**
     * See parent documentation.
     */
    clear(): void {
        this.root = new BNode<T>(true);
    }

    /**
     * See parent documentation.
     */
    empty(): boolean {
        return this.root.values.length == 0;
    }

    /**
     * See parent documentation.
     */
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

    /**
     * See parent documentation.
     */
    find(value: T): boolean {
        return this.findLocation(value)[0] != null;
    }

    /**
     * See parent documentation.
     */
    iterator(): Iterator<T> {
        return iterate(this.root);
    }

    /**
     * See parent documentation.
     */
    size(): number {
        return this.sizeOf(this.root);
    }

    /**
     * See parent documentation.
     */
    toString(): string {
        return `<${this.root.toString()}>`
    }

    /**
     * The function to use when comparing values in _this_.
     */
    private compare: Comparator<T>;

    /**
     * The minimum degree of _this_.
     */
    private minDegree: number;

    /**
     * The root of _this_.
     */
    private root: BNode<T>;

    /**
     * Finds the location of a given value in _this_.
     * @param value the value to find the location of
     * @return a tuple consisting of the node containing the value and the index of
     * the value within the node, or [null, -1] if the value is not present in _this_
     */
    private findLocation(value: T): [BNode<T>, number] {
        if (this.empty()) { // empty tree
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

    /**
     * Merges two nodes. It is assumed that both nodes belong to _this_, and that
     * they are adjacent siblings of each other.
     * @param left the left node of the two sibling nodes
     * @param right the right node of the two sibling nodes
     * @param leftIndex the index of the left node within the parent node's children
     */
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

    /**
     * Rebalances _this_ if _this_ has nodes that are over capacity.
     * @param node the node to start rebalancing from
     */
    private rebalanceOver(node: BNode<T>): void {
        if (node.values.length > 2 * this.minDegree - 1) {
            let [separator, left, right]: [T, BNode<T>, BNode<T>] = this.split(node);

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

    /**
     * Rebalances _this_ if _this_ has nodes that are under capacity.
     * @param node the node to start rebalancing from
     */
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
    }

    /**
     * Calculates the number of values in the subtree rooted at the given node.
     * @param node the node
     * @return the height of the subtree
     */
    private sizeOf(node: BNode<T>): number {
        let size: number = node.values.length;

        if (!node.leaf()) {
            for (let i: number = 0; i < node.children.length; ++i) {
                size += this.sizeOf(node.children[i]);
            }
        }

        return size;
    }

    /**
     * Splits a given node into two nodes and a separation value, such that all values
     * in the left half are less than the separation value, which in turn, is less than
     * all values in the right half. As a warning, the left half is just the modified
     * parameter node, rather than a new node.
     * @param node the node to split
     * @return a tuple of [separation value, left half, right half]
     */
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

    /**
     * Attempts to perform a left rotation with the parameter node
     * as the under-capacity node.
     * @param node the under-capacity node
     * @return whether the rotation was successful
     */
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

    /**
     * Attempts to perform a right rotation with the parameter node
     * as the under-capacity node.
     * @param node the under-capacity node
     * @return whether the rotation was successful
     */
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

/**
 * A B-tree node.
 */
class BNode<T> {
    /**
     * A list of children nodes, or null of _this_ is a leaf node.
     */
    children: BNode<T>[];

    /**
     * The parent of _this_.
     */
    parent: BNode<T>;

    /**
     * A list of values contained of _this_.
     */
    values: T[];

    /**
     * The constructor.
     * @param leaf whether _this_ is a leaf node
     */
    constructor(leaf: boolean) {
        this.children = leaf ? null : [];
        this.parent = null;
        this.values = [];
    }

    /**
     * @return whether this is a leaf node
     */
    leaf(): boolean {
        return this.children == null;
    }

    /**
     * @return the leftmost node in the subtree rooted at _this_
     */
    leftmost(): BNode<T> {
        let node: BNode<T> = this;

        while (node.children != null) {
            node = node.children[0];
        }

        return node;
    }

    /**
     * @return the left sibling of _this_, or null if the sibling doesn't exist
     */
    leftSibling(): BNode<T> {
        let i: number = this.parent.children.indexOf(this);

        if (i < 0) {
            throw Error();
        }

        return i == 0 ? null : this.parent.children[i - 1];
    }

    /**
     * @return the rightmost node in the subtree rooted at _this_
     */
    rightmost(): BNode<T> {
        let node: BNode<T> = this;

        while (node.children != null) {
            node = node.children[node.children.length - 1];
        }

        return node;
    }

    /**
     * @return the right sibling of _this_, or null if the sibling doesn't exist
     */
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

    /**
     * @return a string representation of _this_
     */
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

/**
 * Performs a binary search on the values of the given node.
 * @param node the node to perform a binary search on
 * @param x the value to find
 * @param compare the function to use when comparing values
 * @return the index of x, or the index of the last element checked if x is not found
 */
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

/**
 * Creates an Iterator over the values in the subtree rooted at the given node.
 * @param node the node
 * @return the Iterator
 */
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
