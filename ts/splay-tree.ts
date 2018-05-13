import { BiIterator, Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTIterator, BSTNode } from './binary-search-tree'

export class SplayTree<T> extends BinarySearchTree<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super(compare);
    }

    add(value: T): void {
        let node: BSTNode<T>;

        super.insert(value, (v, p) => {
            node = new BSTNode<T>(v, p);
            return node;
        });

        this.splay(node);
    }

    eraseAt(position: BiIterator<T>): void {
        if (!this.validate(position)) {
            throw Error();
        }

        let parent: BSTNode<T> = (position as BSTIterator<T>).node().parent;

        super.eraseAt(position);
        this.splay(parent);
    }

    find(value: T): BiIterator<T> {
        let it: BSTIterator<T> = super.find(value) as BSTIterator<T>;

        if (it != null) {
            this.splay(it.node());
        }

        return it;
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
