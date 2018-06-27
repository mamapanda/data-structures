import { Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTNode } from './binary-search-tree'

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

    find(value: T): boolean {
        let node: BSTNode<T> = super.findNode(value);

        if (node != null) {
            this.splay(node);

            return true;
        } else {
            return false;
        }
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
