import { Comparator, defaultCompare } from './collection'
import { BinarySearchTree,  BSTNode } from './binary-search-tree'

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
            this.rebalance(node);
        }
    }

    erase(value: T): void {
        let node: BSTNode<T> = this.findNode(value);

        if (node != null) {
            let rebalanceNode = super.remove(node) as AVLNode<T>;

            if (rebalanceNode != null) {
                this.rebalance(rebalanceNode);
            }
        }
    }

    protected rebalance(node: AVLNode<T>) {
        while (node != null) {
            let subroot: AVLNode<T> = this.rebalanceAt(node);

            node.updateSubHeight();
            subroot.updateSubHeight();

            node = subroot.parentAVL();
        }
    }

    protected rebalanceAt(node: AVLNode<T>): AVLNode<T> {
        let balanceFactor: number = node.balanceFactor();

        if (balanceFactor > 1) {
            let rightBalance: number = node.rightAVL().balanceFactor();

            if (rightBalance >= 0) {
                return this.rotateLeft(node);
            } else {
                this.rotateRight(node.rightAVL());
                return this.rotateLeft(node);
            }
        } else if (balanceFactor < -1) {
            let leftBalance: number = node.leftAVL().balanceFactor();

            if (leftBalance <= 0) {
                return this.rotateRight(node);
            } else {
                this.rotateLeft(node.leftAVL());
                return this.rotateRight(node);
            }
        } else {
            return node;
        }
    }

    protected rotateLeft(node: AVLNode<T>): AVLNode<T> {
        let subroot: AVLNode<T> = super.rotateLeft(node) as AVLNode<T>;

        node.updateSubHeight();
        subroot.updateSubHeight();

        return subroot;
    }

    protected rotateRight(node: AVLNode<T>): AVLNode<T> {
        let subroot: AVLNode<T> = super.rotateRight(node) as AVLNode<T>;

        node.updateSubHeight();
        subroot.updateSubHeight();

        return subroot;
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
