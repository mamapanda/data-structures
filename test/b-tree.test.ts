import { expect } from 'chai';
import { Collection, Comparator, defaultCompare } from '../ts/collection';
import { BTree } from '../ts/b-tree';

describe('B-Tree Test', () => {
    describe('constructor', () => {
        it('Minimum Degree', () => {
            let tree: BTree<number> = new BTree<number>(3);

            expect(tree.size()).to.be.eq(0);
            expect(tree.toString()).to.be.eq('<()>');
        });
        it('Minimum Degree, Comparator', () => {
            let tree: BTree<number> = new BTree<number>(3, defaultCompare);

            expect(tree.size()).to.be.eq(0);
            expect(tree.toString()).to.be.eq('<()>');
        });
    });
    describe('BTree::max', () => {

    });
});
