import { Comparator, defaultCompare } from './collection'
import { BinarySearchTree, BSTNode } from './binary-search-tree'

/**
 * An AVL tree.
 */
export class AVLTree<T> extends BinarySearchTree<T> {
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
        let node: AVLNode<T>;
        let inserted: boolean = super.insert(value, (v, p) => {
            node = new AVLNode<T>(v, p as AVLNode<T>)

            return node;
        });

        if (inserted) {
            this.rebalance(node!);
        }
    }

    /**
     * See parent documentation.
     */
    erase(value: T): void {
        let node: BSTNode<T> | null = this.findNode(value);

        if (node != null) {
            let rebalanceNode = super.remove(node) as AVLNode<T>;

            if (rebalanceNode != null) {
                this.rebalance(rebalanceNode);
            }
        }
    }

    /**
     * Rebalances _this_ if _this_ is unbalanced, starting from a given node
     * all the way up to the root of _this_.
     * @param node the node to start rebalancing from
     */
    protected rebalance(node: AVLNode<T>): void {
        while (node != null) {
            let subroot: AVLNode<T> = this.rebalanceAt(node);

            node.updateSubHeight();
            subroot.updateSubHeight();

            node = subroot.parentAVL();
        }
    }

    /**
     * Rebalances _this_ at a particular node. It is assumed that the node
     * is present in _this_.
     * @param node the node to rebalance at
     * @return the new node at the position where the parameter node originally was
     * before the rebalance
     */
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

    /**
     * See parent documentation.
     */
    protected rotateLeft(node: AVLNode<T>): AVLNode<T> {
        let subroot: AVLNode<T> = super.rotateLeft(node) as AVLNode<T>;

        node.updateSubHeight();
        subroot.updateSubHeight();

        return subroot;
    }

    /**
     * See parent documentation.
     */
    protected rotateRight(node: AVLNode<T>): AVLNode<T> {
        let subroot: AVLNode<T> = super.rotateRight(node) as AVLNode<T>;

        node.updateSubHeight();
        subroot.updateSubHeight();

        return subroot;
    }
}

/**
 * An AVL tree node.
 */
class AVLNode<T> extends BSTNode<T> {
    /**
     * The height of the subtree rooted at _this_.
     */
    subHeight: number;

    /**
     * The constructor.
     * @param value the value to store in _this_
     * @param parent the parent of _this_
     * @param left the left child of _this_
     * @param right the right child of _this_
     */
    constructor(value: T,
                parent: AVLNode<T> | null,
                left: AVLNode<T> | null = null,
                right: AVLNode<T> | null = null) {
        super(value, parent, left, right);

        this.updateSubHeight();
    }

    /**
     * @return the balance factor of _this_
     */
    balanceFactor(): number {
        // The 1's cancel out if both children exist.
        let leftH: number = (this.leftAVL() && this.leftAVL().subHeight + 1) || 0;
        let rightH: number = (this.rightAVL() && this.rightAVL().subHeight + 1) || 0;

        return rightH - leftH;
    }

    /**
     * Updates the height of the subtree rooted at _this_.
     */
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
            this.subHeight = 0;
        }
    }

    /**
     * @return the left child of _this_
     */
    leftAVL(): AVLNode<T> {
        return this.left as AVLNode<T>;
    }

    /**
     * @return the parent of _this_
     */
    parentAVL(): AVLNode<T> {
        return this.parent as AVLNode<T>;
    }

    /**
     * @return the right child of _this_
     */
    rightAVL(): AVLNode<T> {
        return this.right as AVLNode<T>;
    }
}
