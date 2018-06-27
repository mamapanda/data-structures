import { Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTNode } from './binary-search-tree'

/**
 * A splay tree.
 */
export class SplayTree<T> extends BinarySearchTree<T> {
    /**
     * The constructor.
     * @param compare the function to use when comparing values in _this_
     */
    constructor(compare: Comparator<T> = defaultCompare) {
        super(compare);
    }

    /**
     * See parent documentation.
     */
    add(value: T): void {
        let node: BSTNode<T>;

        let inserted: boolean = super.insert(value, (v, p) => {
            node = new BSTNode<T>(v, p);
            return node;
        });

        if (inserted) {
            this.splay(node);
        }
    }

    /**
     * See parent documentation.
     */
    erase(value: T): void {
        let node: BSTNode<T> = this.findNode(value);

        if (node != null) {
            let parent: BSTNode<T> = node.parent;

            super.remove(node);

            if (parent != null) {
                this.splay(parent);
            }
        }
    }

    /**
     * See parent documentation.
     */
    find(value: T): boolean {
        let node: BSTNode<T> = super.findNode(value);

        if (node != null) {
            this.splay(node);

            return true;
        } else {
            return false;
        }
    }

    /**
     * See parent documentation.
     */
    max(): T {
        let max: T = super.max();

        this.splay(this.root.rightmost());

        return max;
    }

    /**
     * See parent documentation.
     */
    min(): T {
        let min: T = super.min();

        this.splay(this.root.leftmost());

        return min;
    }

    /**
     * Splays a given node until it is the root of _this_.
     * @param node the node to splay
     */
    private splay(node: BSTNode<T>): void {
        while (node.parent != null) { // while node is not root
            this.splayUp(node);
        }
    }

    /**
     * Splays a given node up using one splay operation.
     * @param node the node to splay
     */
    private splayUp(node: BSTNode<T>): void {
        if (node.parent != null) {
            if (node.parent.parent != null) {
                if ((node == node.parent.left
                     && node.parent == node.parent.parent.left)
                    || (node == node.parent.right
                        && node.parent == node.parent.parent.right)) {
                    this.zigzig(node);
                } else {
                    this.zigzag(node);
                }
            } else {
                this.zig(node);
            }
        }
    }

    /**
     * Performs a zig splay operation on the given node.
     * @param node the node to splay
     */
    private zig(node: BSTNode<T>): void {
        if (node == node.parent.left) {
            this.rotateRight(node.parent);
        } else {
            this.rotateLeft(node.parent);
        }
    }

    /**
     * Performs a zigzag splay operation on the given node.
     * @param node the node to splay
     */
    private zigzag(node: BSTNode<T>): void {
        if (node == node.parent.left) {
            this.rotateRight(node.parent);
            this.rotateLeft(node.parent);
        } else {
            this.rotateLeft(node.parent);
            this.rotateRight(node.parent);
        }
    }

    /**
     * Performs a zigzig splay operation on the given node.
     * @param node the node to splay
     */
    private zigzig(node: BSTNode<T>): void {
        if (node == node.parent.left) {
            this.rotateRight(node.parent.parent);
            this.rotateRight(node.parent);
        } else {
            this.rotateLeft(node.parent.parent);
            this.rotateLeft(node.parent);
        }
    }
}
