import { Collection, Comparator, defaultCompare } from './collection'

export class BinarySearchTree<T> extends Collection<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

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
        this.insert(value, (v, p) => new BSTNode<T>(v, p));
    }

    clear(): void {
        this.root = null;
    }

    erase(value: T): void {
        let node: BSTNode<T> = this.findNode(value);

        if (node != null) {
            this.remove(this.findNode(value));
        }
    }

    find(value: T): boolean {
        return this.findNode(value) != null;
    }

    iterator(): Iterator<T> {
        if (this.root != null) {
            return new BSTIterator<T>(this.root.leftmost());
        } else {
            return new BSTIterator<T>(null);
        }
    }

    size(): number {
        return this.root == null ? 0 : this.root.nChildren() + 1;
    }

    toString(): string {
        return `<${this.root == null ? "" : this.root.toString()}>`
    }

    protected compare: Comparator<T>;
    protected root: BSTNode<T>;

    protected findNode(value: T): BSTNode<T> {
        if (this.empty()) {
            return null;
        }

        let node: BSTNode<T> = this.root;

        while (true) {
            let comparison: number = this.compare(value, node.value);

            if (comparison > 0) {
                if (node.right != null) {
                    node = node.right;
                } else {
                    return null;
                }
            } else if (comparison < 0) {
                if (node.left != null) {
                    node = node.left
                } else {
                    return null;
                }
            } else {
                return node;
            }
        }
    }

    protected insert(value: T,
                     makeNode: (value: T, parent: BSTNode<T>) => BSTNode<T>
                    ): boolean {
        if (this.empty()) {
            this.root = makeNode(value, null);
            return true;
        } else {
            let node: BSTNode<T> = this.root;

            while (true) {
                let comparison: number = this.compare(value, node.value);

                if (comparison > 0) {
                    if (node.right != null) {
                        node = node.right;
                    } else {
                        node.right = makeNode(value, node);
                        return true;
                    }
                } else if (comparison < 0) {
                    if (node.left != null) {
                        node = node.left
                    } else {
                        node.left = makeNode(value, node);
                        return true;
                    }
                } else { // equivalent node already exists
                    return false;
                }
            }
        }
    }

    // Returns the parent of the physically removed node.
    protected remove(node: BSTNode<T>): BSTNode<T> {
        if (node == this.root) { // node.parent == null
            return this.eraseRoot();
        } else { // node.parent != null
            if (node.right == null) {
                node.parent.replaceDirectChild(node, node.left);
                return node.parent;
            } else if (node.left == null) {
                node.parent.replaceDirectChild(node, node.right);
                return node.parent;
            } else {
                let replacement: BSTNode<T> = node.right.leftmost();

                node.value = replacement.value;
                // replacement is leftmost, but may still have right children
                replacement.parent.replaceDirectChild(replacement, replacement.right);

                return replacement.parent;
            }
        }
    }

    protected rotateLeft(node: BSTNode<T>): BSTNode<T> {
        let parent: BSTNode<T> = node.parent;
        let newSubroot: BSTNode<T> = node.right;

        node.right = newSubroot.left;
        if (node.right != null) {
            node.right.parent = node;
        }

        newSubroot.left = node;
        node.parent = newSubroot;

        if (parent != null) { // node was not root
            parent.replaceDirectChild(node, newSubroot);
            newSubroot.parent = parent;
        } else {
            this.root = newSubroot;
            newSubroot.parent = null;
        }

        return newSubroot;
    }

    protected rotateRight(node: BSTNode<T>): BSTNode<T> {
        let parent: BSTNode<T> = node.parent;
        let newSubroot: BSTNode<T> = node.left;

        node.left = newSubroot.right;
        if (node.left != null) {
            node.left.parent = node;
        }

        newSubroot.right = node;
        node.parent = newSubroot;

        if (parent != null) { // node was not root
            parent.replaceDirectChild(node, newSubroot);
            newSubroot.parent = parent;
        } else {
            this.root = newSubroot;
            newSubroot.parent = null;
        }

        return newSubroot;
    }

    private eraseRoot(): BSTNode<T> {
        if (this.root.right == null) {
            this.root = this.root.left;
            return null;
        } else if (this.root.left == null) {
            this.root = this.root.right;
            return null;
        } else {
            let newRoot: BSTNode<T> = this.root.right.leftmost();

            this.root.value = newRoot.value;
            newRoot.parent.replaceDirectChild(newRoot, newRoot.right);

            return newRoot.parent;
        }
    }
}

export class BSTNode<T> {
    left: BSTNode<T>;
    parent: BSTNode<T>;
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

class BSTIterator<T> implements Iterator<T> {
    constructor(node: BSTNode<T>) {
        this.currentNode = node;

    }

    next(): IteratorResult<T> {
        let result: IteratorResult<T>;

        if (this.currentNode == null) {
            result = { value: null, done: true };
        } else {
            result = { value: this.currentNode.value, done: false };
        }

        this.currentNode = this.nextNode();

        return result;
    }

    private currentNode: BSTNode<T>;

    private nextNode(): BSTNode<T> {
        if (this.currentNode == null) {
            return null;
        }

        let nextNode: BSTNode<T>;

        if (this.currentNode.right == null) {
            let previous: BSTNode<T>;
            nextNode = this.currentNode;

            do {
                previous = nextNode;
                nextNode = nextNode.parent;
            } while (nextNode != null && previous != nextNode.left);
        } else {
            nextNode = this.currentNode.right.leftmost();
        }

        return nextNode;
    }
}
