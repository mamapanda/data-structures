import { expect } from 'chai';
import { BiIterator, Comparator, defaultCompare } from '../ts/collection';
import { SplayTree } from '../ts/splay-tree';

describe('Splay Tree Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.toString()).to.be.eq("<>");
            expect(tree.size()).to.be.eq(0);
        })
    })
    describe('SplayTree::add', () => {
        it('Single Input', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(3);

            expect(tree.toString()).to.be.eq("<3[][]>");
        })
        it('Same Input Repeatedly', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq("<0[][]>");
        })
        it('Sorted Input', () => {
            let tree: SplayTree<string> = new SplayTree<string>();
            let expectedStr: string = "<f[e[d[c[b[a[][]][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('SplayTree::eraseAt', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(() => tree.eraseAt(tree.iterator())).to.throw();
        })
        it('Erase Only Element', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(0);
            tree.eraseAt(tree.find(0));

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Root', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<8[6[4[3[0[][1[][]]][]][]][]][9[][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            tree.eraseAt(tree.find(7));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<4[0[][1[][]]][6[][7[][9[8[][]][]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.find(7);

            it.back();
            it.back();
            it.back();
            expect(it.value()).to.be.eq(3);

            tree.eraseAt(it);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Leaf (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<0[6[7[9[][8[][]]][]][3[4[][]][]]][]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.find(7);

            it.forward();
            it.forward();
            it.forward();
            it.forward();
            expect(it.value()).to.be.eq(1);

            tree.eraseAt(it);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Out of Bounds', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.iterator();
            it.back();

            expect(() => tree.eraseAt(it)).to.throw();
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Out of Bounds', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.iterator();

            while (it.valid()) {
                it.forward();
            }

            expect(() => tree.eraseAt(it)).to.throw();
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('SplayTree::find', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.find(0)).to.be.eq(null);
        })
        it('Find Only Element', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(0);

            let it: BiIterator<number> = tree.find(0);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
        })
        it('Find Root', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<7[6[4[3[0[][1[][]]][]][]][]][9[8[][]][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.find(7);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(7);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Internal Node', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<3[0[][1[][]]][7[4[][6[][]]][9[8[][]][]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.find(3);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(3);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Leaf (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<1[7[9[][8[][]]][4[6[][]][3[][]]]][0[][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.find(1);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(1);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Nonexistent Element', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            let it: BiIterator<number> = tree.find(-1);

            expect(it).to.be.eq(null);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
});
