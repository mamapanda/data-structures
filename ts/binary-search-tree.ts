import { Collection, Iterator, Comparator, defaultCompare } from './collection'

export class BinarySearchTree<T> implements Collection<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        this.compare = compare;
        this.root = null;
    }

    max(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.root.rightmost().value;
    }

    min(): T {
        if (this.empty()) {
            throw Error();
        }

        return this.root.leftmost().value;
    }

    add(value: T): void {
        if (this.empty()) {
            this.root = new BSTNode<T>(value, null);
        } else {
            let node: BSTNode<T> = this.root;

            while (true) {
                let comparison: number = this.compare(value, node.value);

                if (comparison > 0) {
                    if (node.right != null) {
                        node = node.right;
                    } else {
                        node.right = new BSTNode<T>(value, node);
                    }
                } else if (comparison < 0) {
                    if (node.left != null) {
                        node = node.left
                    } else {
                        node.left = new BSTNode<T>(value, node);
                    }
                } else {
                    break;
                }
            }
        }
    }

    clear(): void {
        this.root = null;
    }

    empty(): boolean {
        return this.root == null;
    }

    eraseAt(position: Iterator<T>): void {
        if (!this.validate(position)) {
            throw Error();
        }

        let node: BSTNode<T> = (position as BSTIterator<T>).node();

        if (node == this.root) { // node.parent == null
            this.eraseRoot();
        } else { // node.parent != null
            if (node.right == null) {
                node.parent.replaceDirectChild(node, node.left);
            } else if (node.left == null) {
                node.parent.replaceDirectChild(node, node.right);
            } else {
                let replacement: BSTNode<T> = node.right.leftmost();

                node.value = replacement.value;
                replacement.parent.replaceDirectChild(replacement, null);
            }
        }
    }

    find(value: T): Iterator<T> {
        let node: BSTNode<T> = this.root;

        while (node != null) {
            let comparison: number = this.compare(value, node.value);

            if (comparison < 0) {
                node = node.left;
            } else if (comparison > 0) {
                node = node.right;
            } else {
                return new BSTIterator<T>(node, this);
            }
        }

        return null;
    }

    iterator(): Iterator<T> {
        return new BSTIterator<T>(this.root, this);
    }

    size(): number {
        return this.root == null ? 0 : this.root.nChildren() + 1;
    }

    toString(): string {
        return `<${this.root == null ? "" : this.root.toString()}>`
    }

    private compare: Comparator<T>;
    private root: BSTNode<T>;

    private eraseRoot(): void {
        if (this.root.right == null) {
            this.root = this.root.left;
        } else if (this.root.left == null) {
            this.root = this.root.right;
        } else {
            let newRoot: BSTNode<T> = this.root.right.leftmost();

            this.root.value = newRoot.value;
            newRoot.parent.replaceDirectChild(newRoot, null);
        }
    }

    private validate(it: Iterator<T>): boolean {
        return it instanceof BSTIterator && it.source() == this && it.valid();
    }
}

class BSTIterator<T> implements Iterator<T> {
    constructor(node: BSTNode<T>, tree: BinarySearchTree<T>) {
        this.currentNode = node;
        this.tree = tree;
    }

    node(): BSTNode<T> {
        return this.currentNode;
    }

    back(): void {
        if (!this.valid()) {
            throw Error();
        }

        if (this.currentNode.left == null) {
            let previous: BSTNode<T>;

            do {
                previous = this.currentNode;
                this.currentNode = this.currentNode.parent;
            } while (this.currentNode != null
                     && previous != this.currentNode.right);
        } else {
            this.currentNode = this.currentNode.left.rightmost();
        }
    }

    forward(): void {
        if (!this.valid()) {
            throw Error();
        }

        if (this.currentNode.right == null) {
            let previous: BSTNode<T>;

            do {
                previous = this.currentNode;
                this.currentNode = this.currentNode.parent;
            } while (this.currentNode != null
                     && previous != this.currentNode.left);
        } else {
            this.currentNode = this.currentNode.right.leftmost();
        }
    }

    hasNext(): boolean {
        return this.valid() && this.currentNode.right != null;
    }

    hasPrevious(): boolean {
        return this.valid() && this.currentNode.left != null;
    }

    source(): BinarySearchTree<T> {
        return this.tree;
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

    private currentNode: BSTNode<T>;
    private tree: BinarySearchTree<T>;
}

class BSTNode<T> {
    left: BSTNode<T>;
    parent: BSTNode<T>;p
    right: BSTNode<T>;
    value: T;

    constructor(value: T,
                parent: BSTNode<T>,
                left: BSTNode<T> = null,
                right: BSTNode<T> = null) {
        this.left = left;
        this.parent = parent;
        this.right = right;
        this.value = value;
    }

    leftmost(): BSTNode<T> {
        let node: BSTNode<T> = this;

        while (node.left != null) {
            node = node.left;
        }

        return node;
    }

    nChildren(): number {
        let nChildren: number = 0;

        if (this.left != null) {
            nChildren += this.left.nChildren() + 1;
        }

        if (this.right != null) {
            nChildren += this.right.nChildren() + 1;
        }

        return nChildren;
    }

    replaceDirectChild(child: BSTNode<T>, newChild: BSTNode<T>): void {
        if (child == this.left) {
            this.left = newChild;
        } else if (child == this.right) {
            this.right = newChild;
        } else {
            throw Error();
        }
    }

    rightmost() {
        let node: BSTNode<T> = this;

        while (node.right != null) {
            node = node.right;
        }

        return node;
    }

    toString(): string {
        let leftStr: string = this.left == null ? "" : this.left.toString();
        let rightStr: string = this.right == null ? "" : this.right.toString();

        return `${this.value.toString()}[${leftStr}][${rightStr}]`
    }
}
