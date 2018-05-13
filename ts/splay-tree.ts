import { BiIterator, Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTIterator, BSTNode } from './binary-search-tree'

export class SplayTree<T> extends BinarySearchTree<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super(compare);
    }

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

    eraseAt(position: BiIterator<T>): void {
        if (!this.validate(position)) {
            throw Error();
        }

        let node: BSTNode<T> = (position as BSTIterator<T>).node();

        this.splay(node); // node becomes this.root

        if (this.root.left == null) {
            this.root = node.right;
        } else {
            this.root = node.left;
            this.root.parent = null;

            this.splay(this.root.rightmost());

            if (node.right == null) {
                this.root.right = null;
            } else {
                this.root.right = node.right;
                this.root.right.parent = this.root;
            }
        }
    }

    find(value: T): BiIterator<T> {
        let it: BSTIterator<T> = super.find(value) as BSTIterator<T>;

        if (it != null) {
            this.splay(it.node());
        }

        return it;
    }

    max(): T {
        let max: T = super.max();

        this.splay(this.root.rightmost());

        return max;
    }

    min(): T {
        let min: T = super.min();

        this.splay(this.root.leftmost());

        return min;
    }

    private splay(node: BSTNode<T>): void {
        while (node.parent != null) { // while node is not root
            this.splayUp(node);
        }
    }

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

    private zig(node: BSTNode<T>): void {
        if (node == node.parent.left) {
            this.rotateRight(node.parent);
        } else {
            this.rotateLeft(node.parent);
        }
    }

    private zigzag(node: BSTNode<T>): void {
        if (node == node.parent.left) {
            this.rotateRight(node.parent);
            this.rotateLeft(node.parent);
        } else {
            this.rotateLeft(node.parent);
            this.rotateRight(node.parent);
        }
    }

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
