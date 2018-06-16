import { expect } from 'chai';
import { Comparator, defaultCompare } from '../ts/collection';
import { BinarySearchTree } from '../ts/binary-search-tree';

describe('Binary Search Tree Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.toString()).to.be.eq("<>");
            expect(tree.size()).to.be.eq(0);
        })
    })
    describe('BinarySearchTree::max', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.max.bind(tree)).to.throw();
        })
        it('Single Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(3);

            expect(tree.max()).to.be.eq(3);
        })
        it('Sorted Input', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            ["a","b","c","d","e","f"].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq("f");
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [0,1,2,3,4,5].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(0);
        })
        it('Unsorted Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            [6,2,3,4,1].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(6);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.max()).to.be.eq(0);
        })
    })
    describe('BinarySearchTree::min', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.min.bind(tree)).to.throw();
        })
        it('Single Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(3);

            expect(tree.min()).to.be.eq(3);
        })
        it('Sorted Input', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            ["a","b","c","d","e","f"].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq("a");
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [0,1,2,3,4,5].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(5);
        })
        it('Unsorted Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            [6,2,3,4,1].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(1);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x))

            expect(tree.min()).to.be.eq(9);
        })
    })
    describe('BinarySearchTree::add', () => {
        it('Single Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(3);

            expect(tree.toString()).to.be.eq("<3[][]>");
            expect(tree.size()).to.be.eq(1);
        })
        it('Same Input Repeatedly', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq("<0[][]>")
            expect(tree.size()).to.be.eq(1);
        })
        it('Sorted Input', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            let expectedStr: string = "<a[][b[][c[][d[][e[][f[][]]]]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(6);
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);
            let expectedStr: string = "<a[b[c[d[e[f[][]][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(6);
        })
        it('Unsorted Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(8);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            let expectedStr: string = "<0[3[4[6[][]][]][2[][1[][]]]][-1[][-2[][]]]>";

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(8);
        })
    })
    describe('BinarySearchTree::clear', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.clear();

            expect(tree.size()).to.be.eq(0);
        })
        it('Single Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(1);
            tree.clear();

            expect(tree.size()).to.be.eq(0);
        })
        it('Multiple Elements', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));
            tree.clear();

            expect(tree.size()).to.be.eq(0);
        })
    })
    describe('BinarySearchTree::erase', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.erase(0);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Only Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(0);
            tree.erase(0);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Root', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            let expectedStr: string = "<b[][c[][d[][e[][f[][]]]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));
            tree.erase("a");

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);
            let expectedStr: string = "<a[b[d[e[f[][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));
            tree.erase("c");

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            let expectedStr: string = "<0[2[4[6[][]][]][1[][]]][-1[][-2[][]]]>";

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));
            tree.erase(3);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Leaf Node', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));
            tree.erase(-6);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Nonexistent Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));
            tree.erase(-99);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('BinarySearchTree::find', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.find(0)).to.be.eq(false);
        })
        it('Find Only Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(0);

            expect(tree.find(0)).to.be.eq(true);
        })
        it('Find Root', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.find(3)).to.be.eq(true);
        })
        it('Find Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.find(-1)).to.be.eq(true);
        })
        it('Find Leaf Node', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.find("f")).to.be.eq(true);
        })
        it('Find Leaf Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            expect(tree.find(1)).to.be.eq(true);
        })
        it('Find Nonexistent Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.find(5)).to.be.eq(false);
        })
    })
    describe('BinarySearchTree::iterator', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.toArray()).to.be.deep.equal([]);
        })
        it('Single Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(0);

            expect(tree.toArray()).to.be.deep.equal([0]);
        })
        it('Multiple Elements', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => tree.add(x));

            expect(tree.toArray()).to.be.deep.equal([-6, -1, 0, 1, 2, 3, 4, 9]);
        })
    })
    describe('BinarySearchTree::size', () => {
        it('Single Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(3);

            expect(tree.size()).to.be.eq(1);
        })
        it('Same Input Repeatedly', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.size()).to.be.eq(1);
        })
        it('Sorted Input', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.size()).to.be.eq(6);
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.size()).to.be.eq(6);
        })
        it('Unsorted Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.size()).to.be.eq(8);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            expect(tree.size()).to.be.eq(8);
        })
    })
    describe('BinarySearchTree::toString', () => {
        it('Single Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(3);

            expect(tree.toString()).to.be.eq("<3[][]>");
        })
        it('Same Input Repeatedly', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq("<0[][]>")
        })
        it('Sorted Input', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            let expectedStr: string = "<a[][b[][c[][d[][e[][f[][]]]]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);
            let expectedStr: string = "<a[b[c[d[e[f[][]][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Unsorted Input', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            let expectedStr: string = "<0[3[4[6[][]][]][2[][1[][]]]][-1[][-2[][]]]>";

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
});
