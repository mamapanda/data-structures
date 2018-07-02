import { Collection, Comparator, defaultCompare } from './collection'

/**
 * A binary search tree.
 */
export class BinarySearchTree<T> extends Collection<T> {
    /**
     * The constructor.
     * @param compare the comparator function to use when comparing elements
     */
    constructor(compare: Comparator<T> = defaultCompare) {
        super();

        this.compare = compare;
        this.root = null;
    }

    /**
     * Finds the maximum value in _this_. An error is thrown if _this_ is empty.
     * @return the maximum value
     */
    max(): T {
        if (this.root == null) {
            throw Error();
        }

        return this.root.rightmost().value;
    }

    /**
     * Finds the minimum value in _this_. An error is thrown if _this_ is empty.
     * @return the minimum value
     */
    min(): T {
        if (this.root == null) {
            throw Error();
        }

        return this.root.leftmost().value;
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        this.insert(value, (v, p) => new BSTNode<T>(v, p));
    }

    /**
     * See parent documentation.
     */
    clear(): void {
        this.root = null;
    }

    /**
     * See parent documentation.
     */
    empty(): boolean {
        return this.root == null;
    }

    /**
     * See parent documentation.
     */
    erase(value: T): boolean {
        let node: BSTNode<T> | null = this.findNode(value);

        if (node != null) {
            this.remove(node);
            return true;
        } else {
            return false;
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): T | undefined {
        let node: BSTNode<T> | null = this.findNode(value);

        if (node != null) {
            return node.value;
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
        return this.root == null ? 0 : this.root.nChildren() + 1;
    }

    /**
     * See parent documentation.
     */
    toString(): string {
        return `<${this.root == null ? "" : this.root.toString()}>`
    }

    /**
     * The function to use when comparing values.
     */
    protected readonly compare: Comparator<T>;

    /**
     * The root of _this_.
     */
    protected root: BSTNode<T> | null;

    /**
     * Finds the node in _this_ with the given value.
     * @param value the value to look for
     * @return the node with the given value, or null if there is none
     */
    protected findNode(value: T): BSTNode<T> | null {
        if (this.root == null) {
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

    /**
     * Inserts the given value into _this_, creating a node using the supplied
     * function. This method is intended for child classes that may have their own
     * node classes which derive from BSTNode.
     * @param value the value to insert
     * @param makeNode the function to create a node
     * @return whether the value was inserted into _this_
     */
    protected insert(value: T,
                     makeNode: (value: T, parent: BSTNode<T> | null) => BSTNode<T>
                    ): boolean {
        if (this.root == null) {
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

    /**
     * Deletes the value at the given node in _this_. It is assumed that
     * the node is already present in _this_. This method returns the parent
     * of whatever node was physically removed, which may not be the same as
     * the parameter node.
     * @param node the node with the value to delete
     * @return the parent of the physically removed node
     */
    protected remove(node: BSTNode<T>): BSTNode<T> | null {
        if (node == this.root) { // node.parent == null
            return this.eraseRoot();
        } else { // node.parent != null
            if (!node.parent) {
                throw Error();
            }

            if (node.right == null) {
                node.parent.replaceDirectChild(node, node.left);
                return node.parent;
            } else if (node.left == null) {
                node.parent.replaceDirectChild(node, node.right);
                return node.parent;
            } else {
                let replacement: BSTNode<T> = node.right.leftmost();

                if (!replacement.parent) {
                    throw Error();
                }

                node.value = replacement.value;
                // replacement is leftmost, but may still have right children
                replacement.parent.replaceDirectChild(replacement, replacement.right);

                return replacement.parent;
            }
        }
    }

    /**
     * Performs a left rotation at the given node. The node is assumed to be present
     * in _this_. This method is intended for child classes that make use of rotations.
     * @param node the node to perform a left rotation at
     * @return the new node at the position where the parameter node originally was
     * before the rotation
     */
    protected rotateLeft(node: BSTNode<T>): BSTNode<T> {
        if (node.right == null) {
            throw Error();
        }

        let parent: BSTNode<T> | null = node.parent;
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

    /**
     * Performs a right rotation at the given node. The node is assumed to be present
     * in _this_. This method is intended for child classes that make use of rotations.
     * @param node the node to perform a right rotation at
     * @return the new node at the position where the parameter node originally was
     * before the rotation
     */
    protected rotateRight(node: BSTNode<T>): BSTNode<T> {
        if (node.left == null) {
            throw Error();
        }

        let parent: BSTNode<T> | null = node.parent;
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

    /**
     * Deletes the value at the root of _this_. This method returns the parent
     * of whatever node was physically removed, which may not be the same as
     * _this_.root.
     * @return the parent of the physically removed node
     */
    private eraseRoot(): BSTNode<T> | null {
        if (this.root != null) {
            if (this.root.right == null) {
                this.root = this.root.left;

                if (this.root != null) {
                    this.root.parent = null;
                }

                return null;
            } else if (this.root.left == null) {
                this.root = this.root.right;

                if (this.root != null) {
                    this.root.parent = null;
                }

                return null;
            } else {
                let newRoot: BSTNode<T> = this.root.right.leftmost();

                if (!newRoot.parent) {
                    throw Error();
                }

                this.root.value = newRoot.value;
                newRoot.parent.replaceDirectChild(newRoot, newRoot.right);

                return newRoot.parent;
            }
        } else {
            throw Error();
        }
    }
}

/**
 * A binary search tree node.
 * @hidden
 */
export class BSTNode<T> {
    /**
     * The left child of _this_, or null if this has no left child.
     */
    left: BSTNode<T> | null;

    /**
     * The parent of _this_, or null if _this_ has no parent.
     */
    parent: BSTNode<T> | null;

    /**
     * The right child of _this_, or null if _this_ has no right child.
     */
    right: BSTNode<T> | null;

    /**
     * The value contained in _this_.
     */
    value: T;

    /**
     * The constructor.
     * @param value the value to store in _this_
     * @param parent the parent of _this_
     * @param left the left child of _this_
     * @param right the right child of _this_
     */
    constructor(value: T,
                parent: BSTNode<T> | null,
                left: BSTNode<T> | null = null,
                right: BSTNode<T> | null = null) {
        this.left = left;
        this.parent = parent;
        this.right = right;
        this.value = value;
    }

    /**
     * @return the leftmost node in the subtree rooted at _this_
     */
    leftmost(): BSTNode<T> {
        let node: BSTNode<T> = this;

        while (node.left != null) {
            node = node.left;
        }

        return node;
    }

    /**
     * @return the total number of child nodes _this_ has
     */
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

    /**
     * Replaces a given child of _this_. Be careful if the child to replace is null
     * and both children of _this_ are null.
     * @param child the child to replace
     * @param newChild the replacement child
     */
    replaceDirectChild(child: BSTNode<T>, newChild: BSTNode<T> | null): void {
        if (child == this.left) {
            this.left = newChild;
        } else if (child == this.right) {
            this.right = newChild;
        } else {
            throw Error();
        }
    }

    /**
     * @return the rightmost node in the subtree rooted at _this_
     */
    rightmost() {
        let node: BSTNode<T> = this;

        while (node.right != null) {
            node = node.right;
        }

        return node;
    }

    /**
     * @return the string representation of the subtree rooted at this
     */
    toString(): string {
        let leftStr: string = this.left == null ? "" : this.left.toString();
        let rightStr: string = this.right == null ? "" : this.right.toString();

        return `${this.value.toString()}[${leftStr}][${rightStr}]`
    }
}

/**
 * @return an Iterator that iterates over the subtree rooted at the given node
 */
function* iterate<T>(node: BSTNode<T> | null): Iterator<T> {
    if (node != null) {
        yield* iterate(node.left)[Symbol.iterator](); // null checked by function
        yield node.value;
        yield* iterate(node.right)[Symbol.iterator]();
    }
}
