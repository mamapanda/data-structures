import { expect } from 'chai';
import { Iterator, Comparator, defaultCompare } from './collection'
import { BinarySearchTree } from './binary-search-tree'

describe('Binary Search Tree Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.toString()).to.be.eq("<>");
            expect(tree.size()).to.be.eq(0);
        })
    })
    describe('BinarySearchTree::max', () => {
        it('[]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.max.bind(tree)).to.throw();
        })
        it('[3]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(3);

            expect(tree.max()).to.be.eq(3);
        })
        it('["a","b","c","d","e","f"]', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            ["a","b","c","d","e","f"].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq("f");
        })
        it('[0,1,2,3,4,5] (Reversed Comparison)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [0,1,2,3,4,5].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(0);
        })
        it('[6,8,7,9,3,4,1]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            [6,2,3,4,1].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(6);
        })
        it('[6,1,0,3,4,8,9,7] (Reversed Comparison)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(0);
        })
    })
    describe('BinarySearchTree::min', () => {
        it('[]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.min.bind(tree)).to.throw();
        })
        it('[3]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(3);

            expect(tree.min()).to.be.eq(3);
        })
        it('["a","b","c","d","e","f"]', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            ["a","b","c","d","e","f"].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq("a");
        })
        it('[0,1,2,3,4,5] (Reversed Comparison)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [0,1,2,3,4,5].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(5);
        })
        it('[6,8,7,9,3,4,1]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            [6,2,3,4,1].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(1);
        })
        it('[6,1,0,3,4,8,9,7] (Reversed Comparison)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(9);
        })
    })
    describe('BinarySearchTree::add', () => {
        it('[3]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(3);

            expect(tree.toString()).to.be.eq("<3[][]>");
            expect(tree.size()).to.be.eq(1);
        })
        it('[0,0,0,0,0,0,0,0,0,0,0]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq("<0[][]>")
            expect(tree.size()).to.be.eq(1);
        })
        it('["a","b","c","d","e","f"]', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            let expectedStr: string = "<a[][b[][c[][d[][e[][f[][]]]]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr)
            expect(tree.size()).to.be.eq(6);
        })
        it('["a","b","c","d","e","f"] (Reversed Comparison)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);
            let expectedStr: string = "<a[b[c[d[e[f[][]][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr)
            expect(tree.size()).to.be.eq(6);
        })
        it('[3,-1,2,3,2,1,0,-333]', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr)
            expect(tree.size()).to.be.eq(8);
        })
        it('[0,3,2,2,-1,4,1,2,-1,-2,6,3] (Reversed Comparison)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            let expectedStr: string = "<0[3[4[6[][]][]][2[][1[][]]]][-1[][-2[][]]]>";

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr)
            expect(tree.size()).to.be.eq(8);
        })
    })
});
