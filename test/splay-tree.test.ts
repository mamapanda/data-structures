import { expect } from 'chai';
import { SplayTree, Comparator, defaultCompare } from '../ts/data-structures';

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
    describe('SplayTree::erase', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.erase(0)).to.be.eq(false);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Only Element', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(0);
            expect(tree.erase(0)).to.be.eq(true);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Root', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<8[6[4[3[0[][1[][]]][]][]][]][9[][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.erase(7)).to.be.eq(true);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<4[0[][1[][]]][6[][7[][9[8[][]][]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.erase(3)).to.be.eq(true);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Leaf (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<9[][7[][6[][4[][3[][0[1[][]][]]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.erase(8)).to.be.eq(true);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Nonexistent Element', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))
            expect(tree.erase(-99)).to.be.eq(false);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('SplayTree::find', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.find(0)).to.be.eq(undefined);
        })
        it('Find Only Element', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(0);

            expect(tree.find(0)).to.be.eq(0);
        })
        it('Find Root', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<7[6[4[3[0[][1[][]]][]][]][]][9[8[][]][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            expect(tree.find(7)).to.be.eq(7);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Internal Node', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = "<3[0[][1[][]]][7[4[][6[][]]][9[8[][]][]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            expect(tree.find(3)).to.be.eq(3);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Leaf (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<1[7[9[][8[][]]][4[6[][]][3[][]]]][0[][]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.find(1)).to.be.eq(1);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Find Nonexistent Element', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: SplayTree<number> = new SplayTree<number>(cmp);
            let expectedStr: string = "<7[9[][8[][]]][6[][4[][3[][0[1[][]][]]]]]>";

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.find(-99)).to.be.eq(undefined);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('SplayTree::max', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.max.bind(tree)).to.throw();
        })
        it('Single Input', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(3);

            expect(tree.max()).to.be.eq(3);
            expect(tree.toString()).to.be.eq('<3[][]>');
        })
        it('Multiple Inputs', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = '<9[7[6[4[3[0[][1[][]]][]][]][]][8[][]]][]>';

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(9);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('SplayTree::min', () => {
        it('Empty Tree', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            expect(tree.min.bind(tree)).to.throw();
        })
        it('Single Input', () => {
            let tree: SplayTree<number> = new SplayTree<number>();

            tree.add(3);

            expect(tree.min()).to.be.eq(3);
            expect(tree.toString()).to.be.eq('<3[][]>');
        })
        it('Multiple Inputs', () => {
            let tree: SplayTree<number> = new SplayTree<number>();
            let expectedStr: string = '<0[][6[3[1[][]][4[][]]][7[][9[8[][]][]]]]>';

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(0);
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
});
