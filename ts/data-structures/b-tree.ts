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

        if (node.values.length <= 0) {
            throw Error();
        }

        return node.values[node.values.length - 1];
    }

    /**
     * Finds the minimum value in _this_. An error is thrown if _this_ is empty.
     * @return the minimum value
     */
    min(): T {
        let node: BNode<T> = this.root.leftmost();

        if (node.values.length <= 0) {
            throw Error();
        }

        return node.values[0];
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
            } else if (node.children == null) {
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
    erase(value: T): boolean {
        let [node, i]: [BNode<T> | null, number] = this.findLocation(value);

        if (node != null) {
            if (node.children == null) {
                node.values.splice(i, 1);
                this.rebalanceUnder(node);
            } else {
                let rightmost: BNode<T> = node.children[i].rightmost();

                let replacement: T | undefined = rightmost.values.pop();

                if (replacement === undefined) {
                    throw Error();
                }

                node.values[i] = replacement;

                this.rebalanceUnder(rightmost);
            }

            return true;
        } else {
            return false;
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): T | undefined {
        let [node, i]: [BNode<T> | null, number] = this.findLocation(value);

        if (node != null) {
            return node.values[i];
        } else {
            return undefined;
        }
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
    private readonly compare: Comparator<T>;

    /**
     * The minimum degree of _this_.
     */
    private readonly minDegree: number;

    /**
     * The root of _this_. root.values is empty if _this_ is empty.
     */
    private root: BNode<T>;

    /**
     * Finds the location of a given value in _this_.
     * @param value the value to find the location of
     * @return a tuple consisting of the node containing the value and the index of
     * the value within the node, or [null, -1] if the value is not present in _this_
     */
    private findLocation(value: T): [BNode<T> | null, number] {
        if (this.empty()) { // empty tree
            return [null, -1];
        }

        let node: BNode<T> = this.root;

        while (true) {
            let i: number = binarySearch(node, value, this.compare);
            let cmpResult: number = this.compare(value, node.values[i]);

            if (cmpResult == 0) {
                return [node, i];
            } else if (node.children == null) {
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
        if (!left.parent || !right.parent || left.parent != right.parent) {
            throw Error();
        }

        let parent: BNode<T> = left.parent;

        if (!parent.children) {
            throw Error();
        }

        let separator: T = parent.values.splice(leftIndex, 1)[0];

        left.values.push(separator);
        left.values.push(...right.values);

        if (left.children) { // right is also not leaf
            if (!right.children) {
                throw Error();
            }

            left.children.push(...right.children);
            right.children.forEach(n => n.parent = left);
        }

        parent.children.splice(leftIndex + 1, 1); // remove right
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
                this.root.children = [left, right];

                left.parent = this.root;
                right.parent = this.root;
            } else {
                if (!node.parent || !node.parent.children) {
                    throw Error();
                }

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
            if (!node.parent || !node.parent.children) {
                throw Error();
            }

            if (!this.tryRotateLeft(node) && !this.tryRotateRight(node)) {
                let leftSibling: BNode<T> | null = node.leftSibling();
                let i: number = node.parent.children.indexOf(node);

                if (leftSibling != null) { // merge node into left sibling
                    this.merge(leftSibling, node, i - 1);
                } else { // merge right sibling into node
                    let rightSibling: BNode<T> | null = node.rightSibling();

                    if (!rightSibling) {
                        throw Error();
                    }

                    this.merge(node, rightSibling, i);
                }

                this.rebalanceUnder(node.parent!);
            }
        } else if (node == this.root && node.values.length == 0) {
            if (this.root.children) { // should have been a merge step before
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

        if (node.children) {
            for (let i: number = 0; i < node.children.length; ++i) {
                size += this.sizeOf(node.children[i]);
            }
        }

        return size;
    }

    /**
     * Splits a given node into two nodes and a separation value, such that all values
     * in the left half are less than the separation value, which in turn, is less than
     * all values in the right half. The node is assumed to be over capacity.
     * As a warning, the left half is just the modified
     * parameter node, rather than a new node.
     * @param node the node to split
     * @return a tuple of [separation value, left half, right half]
     */
    private split(node: BNode<T>): [T, BNode<T>, BNode<T>] {
        let left: BNode<T> = node;
        let right: BNode<T> = new BNode<T>(!left.children);

        right.values = left.values.splice(this.minDegree + 1,
                                          left.values.length);
        if (left.children) {
            right.children = left.children.splice(this.minDegree + 1,
                                                  left.children.length);
            right.children.forEach(n => n.parent = right);
        }

        let separator: T | undefined = left.values.pop();

        if (separator === undefined) {
            throw Error();
        }

        return [separator, left, right];
    }

    /**
     * Attempts to perform a left rotation with the parameter node
     * as the under-capacity node.
     * @param node the under-capacity node
     * @return whether the rotation was successful
     */
    private tryRotateLeft(node: BNode<T>): boolean {
        if (!node.parent) {
            return false;
        }

        if (!node.parent.children) {
            throw Error();
        }

        let sibling: BNode<T> | null = node.rightSibling();

        if (sibling != null && sibling.values.length > this.minDegree - 1) {
            let i: number = node.parent.children.indexOf(node);

            node.values.push(node.parent.values[i]);
            node.parent.values[i] = sibling.values.splice(0, 1)[0];

            if (node.children) {
                if (!sibling.children) {
                    throw Error();
                }

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
        if (!node.parent) {
            return false;
        }

        if (!node.parent.children) {
            throw Error();
        }

        let sibling: BNode<T> | null = node.leftSibling();

        if (sibling != null && sibling.values.length > this.minDegree - 1) {
            let i: number = node.parent.children.indexOf(node);

            node.values.splice(0, 0, node.parent.values[i - 1]);
            node.parent.values[i - 1] = sibling.values.pop()!;

            if (node.children) {
                if (!sibling.children) {
                    throw Error();
                }

                let x: BNode<T> | undefined = sibling.children.pop();

                if (x === undefined) {
                    throw Error();
                }

                node.children.splice(0, 0, x);
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
    children: BNode<T>[] | null;

    /**
     * The parent of _this_.
     */
    parent: BNode<T> | null;

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
    leftSibling(): BNode<T> | null {
        if (this.parent != null) {
            let siblings: BNode<T>[] = this.parent!.children!;
            let i: number = siblings.indexOf(this);

            if (i < 0) {
                throw Error();
            }

            return i == 0 ? null : siblings[i - 1];
        } else {
            return null;
        }
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
    rightSibling(): BNode<T> | null {
        if (this.parent != null) {
            let siblings: BNode<T>[] = this.parent!.children!;
            let i: number = siblings.indexOf(this);

            if (i < 0) {
                throw Error();
            }

            if (i == siblings.length - 1) {
                return null;
            } else {
                return siblings[i + 1];
            }
        } else {
            return null;
        }
    }

    /**
     * @return a string representation of _this_
     */
    toString(): string {
        let str: string = `(${this.values.toString()})`;

        if (this.children) {
            for (let child of this.children!) {
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
    let mid: number = -1;

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
    if (!node.children) {
        yield* node.values;
    } else {
        let children: BNode<T>[] = node.children;

        yield* iterate(children[0])[Symbol.iterator]();

        for (let i: number = 0; i < node.values.length; ++i) {
            yield node.values[i];
            yield* iterate(children[i + 1])[Symbol.iterator]();
        }
    }
}
