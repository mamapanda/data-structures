import { expect } from 'chai';
import { BiIterator, Comparator, defaultCompare } from './collection';
import { BinarySearchTree } from './binary-search-tree';

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
    describe('BinarySearchTree::eraseAt', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(() => tree.eraseAt(tree.iterator())).to.throw();
        })
        it('Erase Only Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(0);
            tree.eraseAt(tree.find(0));

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Root', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();
            let expectedStr: string = "<b[][c[][d[][e[][f[][]]]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));
            tree.eraseAt(tree.find("a"));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<string> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>(cmp);
            let expectedStr: string = "<a[b[d[e[f[][]][]][]][]][]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));
            tree.eraseAt(tree.find("c"));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);
            let expectedStr: string = "<0[2[4[6[][]][]][1[][]]][-1[][-2[][]]]>";

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));
            tree.eraseAt(tree.find(3));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Leaf Node', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));
            tree.eraseAt(tree.find(-6));

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Out of Bounds', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.iterator();

            while (it.valid()) {
                it.back();
            }

            expect(() => tree.eraseAt(it)).to.throw();
            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Out of Bounds', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let expectedStr: string = "<3[-1[-6[][]][1[0[][]][2[][]]]][4[][9[][]]]>";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.iterator();

            while (it.valid()) {
                it.forward();
            }

            expect(() => tree.eraseAt(it)).to.throw();
            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
    describe('BinarySearchTree::find', () => {
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            expect(tree.find(0)).to.be.eq(null);
        })
        it('Find Only Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            tree.add(0);

            let it: BiIterator<number> = tree.find(0);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
        })
        it('Find Root', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.find(3);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(3);
        })
        it('Find Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.find(-1);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(-1);
        })
        it('Find Leaf Node', () => {
            let tree: BinarySearchTree<string> = new BinarySearchTree<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            let it: BiIterator<string> = tree.find("f");

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq("f");
        })
        it('Find Leaf Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.find(1);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(1);
        })
        it('Find Nonexistent Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            expect(tree.find(5)).to.be.eq(null);
        })
    })
    describe('BinarySearchTree::iterator', () => {
        it('Access Invalid Iterator', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let it: BiIterator<number> = tree.iterator();

            expect(it.valid()).to.be.eq(false);
            expect(it.value.bind(it)).to.throw();
        })
        it('Empty Tree', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            let it: BiIterator<number> = tree.iterator();

            expect(it.valid()).to.be.eq(false);
        })
        it('Single Element', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();
            tree.add(0);

            let it: BiIterator<number> = tree.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(tree);
            expect(it.valid()).to.be.eq(true);

            it.forward();

            expect(it.valid()).to.be.eq(false);
        })
        it('Iterate Forward', () => {
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(-6);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(true);
            expect(it.source()).to.be.eq(tree);
            expect(it.valid()).to.be.eq(true);

            let output: number[] = [];

            while (it.valid()) {
                output.push(it.value());
                it.forward();
            }

            expect(it.value.bind(it)).to.throw();
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(tree);
            expect(it.valid()).to.be.eq(false);

            expect(output).to.be.deep.equal([-6, -1, 0, 1, 2, 3, 4, 9]);
        })
        it('Iterate Forward then Backward (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BinarySearchTree<number> = new BinarySearchTree<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => tree.add(x));

            let it: BiIterator<number> = tree.iterator();

            let forwardOutput: number[] = [];
            let backwardOutput: number[] = [];

            while (it.hasNext()) {
                forwardOutput.push(it.value());
                it.forward();
            }
            if (it.valid()) {
                forwardOutput.push(it.value());
            }

            let expected: number[] = [9, 4, 3, 2, 1, 0, -1, -6];
            expect(forwardOutput).to.be.deep.equal(expected);

            while (it.hasPrevious()) {
                backwardOutput.push(it.value());
                it.back();
            }
            if (it.valid()) {
                backwardOutput.push(it.value());
            }

            it.back();
            expect(it.valid()).to.be.eq(false);

            expected.reverse();
            expect(backwardOutput).to.be.deep.equal(expected);
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
