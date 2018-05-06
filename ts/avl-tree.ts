import { BiIterator, Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTIterator, BSTNode } from './binary-search-tree'

export class AVLTree<T> extends BinarySearchTree<T> {
    constructor(compare: Comparator<T> = defaultCompare) {
        super(compare);
    }

    add(value: T): void {
        let node: AVLNode<T>;
        let inserted: boolean = super.insert(value, (v, p) => {
            node = new AVLNode<T>(v, p as AVLNode<T>)

            return node;
        });

        if (inserted) {
            rebalance(node);
        }
    }

    eraseAt(position: BiIterator<T>): void {
        if (!this.validate(position)) {
            throw Error();
        }

        let node: BSTNode<T> = (position as BSTIterator<T>).node();
        let rebalanceNode = super.remove(node) as AVLNode<T>;

        if (rebalanceNode != null) {
            rebalance(rebalanceNode);
        }
    }
}

class AVLNode<T> extends BSTNode<T> {
    subHeight: number;

    constructor(value: T,
                parent: AVLNode<T>,
                left: AVLNode<T> = null,
                right: AVLNode<T> = null) {
        super(value, parent, left, right);

        this.updateSubHeight();
    }

    balanceFactor(): number {
        let leftH: number = (this.leftAVL() && this.leftAVL().subHeight) || 0;
        let rightH: number = (this.rightAVL() && this.rightAVL().subHeight) || 0;

        return rightH - leftH;
    }

    updateSubHeight(): void {
        let left: AVLNode<T> = this.leftAVL();
        let right: AVLNode<T> = this.rightAVL();

        if (left != null && right != null) {
            this.subHeight = 1 + Math.max(left.subHeight, right.subHeight);
        } else if (left != null) {
            this.subHeight = 1 + left.subHeight;
        } else if (right != null) {
            this.subHeight = 1 + right.subHeight;
        } else {
            this.subHeight = 1;
        }
    }

    leftAVL(): AVLNode<T> {
        return this.left as AVLNode<T>;
    }

    parentAVL(): AVLNode<T> {
        return this.parent as AVLNode<T>;
    }

    rightAVL(): AVLNode<T> {
        return this.right as AVLNode<T>;
    }
}

function rebalance<T>(node: AVLNode<T>): void {
    while (node != null) {
        node = rebalanceAt(node).parentAVL();
    }
}

function rebalanceAt<T>(node: AVLNode<T>): AVLNode<T> {
    let balanceFactor: number = node.balanceFactor();

    if (balanceFactor > 1) {
        let rightBalance: number = node.rightAVL().balanceFactor();

        if (rightBalance >= 0) {
            return rotateLeft(node);
        } else {
            rotateRight(node.rightAVL());
            return rotateLeft(node);
        }
    } else if (balanceFactor < -1) {
        let leftBalance: number = node.leftAVL().balanceFactor();

        if (leftBalance <= 0) {
            return rotateRight(node);
        } else {
            rotateLeft(node.leftAVL());
            return rotateRight(node);
        }
    } else {
        return node;
    }
}

// doesn't update all ancestor subheights for lower rebalance time complexity
function rotateLeft<T>(node: AVLNode<T>): AVLNode<T> {
    let parent: AVLNode<T> = node.parentAVL();
    let newSubRoot: AVLNode<T> = node.rightAVL();

    node.right = newSubRoot.left;
    node.right.parent = node;

    newSubRoot.left = node;
    node.parent = newSubRoot;

    parent.replaceDirectChild(node, newSubRoot);
    newSubRoot.parent = parent;

    node.updateSubHeight();
    newSubRoot.updateSubHeight();

    return newSubRoot;
}

// doesn't update all ancestor subheights for lower rebalance time complexity
function rotateRight<T>(node: AVLNode<T>): AVLNode<T> {
    let parent: AVLNode<T> = node.parentAVL();
    let newSubRoot: AVLNode<T> = node.leftAVL();

    node.left = newSubRoot.right;
    node.left.parent = node;

    newSubRoot.right = node;
    node.parent = newSubRoot;

    parent.replaceDirectChild(node, newSubRoot);
    newSubRoot.parent = parent;

    node.updateSubHeight();
    newSubRoot.updateSubHeight();

    return newSubRoot;
}
