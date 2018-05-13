import { expect } from 'chai';
import { BiIterator, Comparator, defaultCompare } from '../ts/collection';
import { BinaryHeap } from '../ts/binary-heap';

describe('Binary Heap Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.toArray()).to.be.deep.equal([]);
            expect(heap.size()).to.be.eq(0);
        })
    })
    describe('BinaryHeap::min', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.min.bind(heap)).to.throw();
        })
        it('Single Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(3);

            expect(heap.min()).to.be.eq(3);
        })
        it('Sorted Input', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();

            ["a","b","c","d","e","f"].forEach(x => heap.add(x))

            expect(heap.min()).to.be.eq("a");
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [0,1,2,3,4,5].forEach(x => heap.add(x))

            expect(heap.min()).to.be.eq(5);
        })
        it('Unsorted Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [6,2,3,4,1].forEach(x => heap.add(x))

            expect(heap.min()).to.be.eq(1);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [6,1,0,3,4,8,9,7].forEach(x => heap.add(x))

            expect(heap.min()).to.be.eq(9);
        })
    })
    describe('BinaryHeap::popMin', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.popMin.bind(heap)).to.throw();
        })
        it('Single Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(3);

            expect(heap.popMin()).to.be.eq(3);
            expect(heap.size()).to.be.eq(0);
        })
        it('Sorted Input', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();

            ["a","b","c","d","e","f"].forEach(x => heap.add(x))

            expect(heap.popMin()).to.be.eq("a");
            expect(heap.toArray()).to.be.deep.equal(['b', 'd', 'c', 'f', 'e']);
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [0,1,2,3,4,5].forEach(x => heap.add(x))

            expect(heap.popMin()).to.be.eq(5);
            expect(heap.toArray()).to.be.deep.equal([4, 3, 1, 0, 2]);
        })
        it('Unsorted Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [6,2,3,4,1].forEach(x => heap.add(x))

            expect(heap.popMin()).to.be.eq(1);
            expect(heap.toArray()).to.be.deep.equal([2, 4, 3, 6]);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [6,1,0,3,4,8,9,7].forEach(x => heap.add(x))

            expect(heap.popMin()).to.be.eq(9);
            expect(heap.toArray()).to.be.deep.equal([8, 7, 6, 4, 3, 0, 1]);
        })
    })
    describe('BinaryHeap::add', () => {
        it('Single Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(3);

            expect(heap.toArray()).to.be.deep.equal([3]);
        })
        it('Same Input Repeatedly', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            let xs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            xs.forEach(x => heap.add(x));

            expect(heap.toArray()).to.be.deep.equal(xs);
        })
        it('Sorted Input', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();
            let xs: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];

            xs.forEach(x => heap.add(x));

            expect(heap.toArray()).to.be.deep.equal(xs);
        })
        it('Sorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [0,1,2,3,4,5].forEach(x => heap.add(x))

            expect(heap.toArray()).to.be.deep.equal([5, 3, 4, 0, 2, 1]);
        })
        it('Unsorted Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [6,1,0,3,4,8,9,7].forEach(x => heap.add(x))

            expect(heap.toArray()).to.be.deep.equal([9, 7, 8, 4, 3, 0, 6, 1]);
        })
    })
    describe('BinaryHeap::clear', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.clear();

            expect(heap.size()).to.be.eq(0);
        })
        it('Single Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(1);
            heap.clear();

            expect(heap.size()).to.be.eq(0);
        })
        it('Multiple Elements', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));
            heap.clear();

            expect(heap.size()).to.be.eq(0);
        })
    })
    describe('BinaryHeap::eraseAt', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(() => heap.eraseAt(heap.iterator())).to.throw();
        })
        it('Erase Only Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(0);
            heap.eraseAt(heap.find(0));

            expect(heap.empty()).to.be.eq(true);
        })
        it('Erase Min (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [6,1,0,3,4,8,9,7].forEach(x => heap.add(x))
            heap.eraseAt(heap.iterator());

            expect(heap.toArray()).to.be.deep.equal([8, 7, 6, 4, 3, 0, 1]);
        })
        it('Erase Internal Node', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));
            heap.eraseAt(heap.find(-1));

            expect(heap.toArray()).to.be.deep.equal([-6, 0, 2, 1, 3, 9, 4, 9, 4]);
        })
        it('Erase Leaf Node', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));
            heap.eraseAt(heap.find(3));

            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4]);
        })
        it('Erase Out of Bounds', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.iterator();

            it.back();

            expect(() => heap.eraseAt(it)).to.throw();
            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
        })
        it('Erase Out of Bounds', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.iterator();

            while (it.valid()) {
                it.forward();
            }

            expect(() => heap.eraseAt(it)).to.throw();
            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
        })
    })
    describe('BinaryHeap::find', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.find(0)).to.be.eq(null);
        })
        it('Find Only Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(0);

            let it: BiIterator<number> = heap.find(0);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
        })
        it('Find Min', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.find(3);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(3);
        })
        it('Find Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.find(-1);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(-1);
        })
        it('Find Leaf Node', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => heap.add(x));

            let it: BiIterator<string> = heap.find("f");

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq("f");
        })
        it('Find Nonexistent Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.find(5)).to.be.eq(null);
        })
    })
    describe('BinaryHeap::iterator', () => {
        it('Access Invalid Iterator', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            let it: BiIterator<number> = heap.iterator();

            expect(it.valid()).to.be.eq(false);
            expect(it.value.bind(it)).to.throw();
        })
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            let it: BiIterator<number> = heap.iterator();

            expect(it.valid()).to.be.eq(false);
        })
        it('Single Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            heap.add(0);

            let it: BiIterator<number> = heap.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(heap);
            expect(it.valid()).to.be.eq(true);

            it.forward();

            expect(it.valid()).to.be.eq(false);
        })
        it('Iterate Forward', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(-6);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(true);
            expect(it.source()).to.be.eq(heap);
            expect(it.valid()).to.be.eq(true);

            let output: number[] = [];

            while (it.valid()) {
                output.push(it.value());
                it.forward();
            }

            expect(it.value.bind(it)).to.throw();
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(heap);
            expect(it.valid()).to.be.eq(false);

            expect(output).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
        })
        it('Iterate Forward then Backward (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            let it: BiIterator<number> = heap.iterator();

            let forwardOutput: number[] = [];
            let backwardOutput: number[] = [];

            while (it.hasNext()) {
                forwardOutput.push(it.value());
                it.forward();
            }
            if (it.valid()) {
                forwardOutput.push(it.value());
            }

            let expected: number[] = [9, 4, 9, 4, 1, 3, 2, -6, -1, 0];
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
    describe('BinaryHeap::size', () => {
        it('Single Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(3);

            expect(heap.size()).to.be.eq(1);
        })
        it('Same Input Repeatedly', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            let xs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            xs.forEach(x => heap.add(x));

            expect(heap.size()).to.be.eq(xs.length);
        })
        it('Sorted Input', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();
            let xs: string[] = ["a", "b", "c", "d", "e", "f"];

            xs.forEach(x => heap.add(x));

            expect(heap.size()).to.be.eq(xs.length);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);
            let xs: number[] = [0, 3, 2, 2, -1, 4, 1, 2, -1, -2, 6, 3];

            xs.forEach(x => heap.add(x));

            expect(heap.size()).to.be.eq(xs.length);
        })
    })

    describe('BinaryHeap::toString', () => {
        it('Single Input', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(3);

            expect(heap.toString()).to.be.eq("[3]");
        })
        it('Same Input Repeatedly', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            let xs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            xs.forEach(x => heap.add(x));

            expect(heap.toString()).to.be.eq(`[${xs.toString()}]`);
        })
        it('Sorted Input', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();
            let expectedStr: string = "[a,b,c,d,e,f]";

            ["a", "b", "c", "d", "e", "f"].forEach(x => heap.add(x));

            expect(heap.toString()).to.be.eq(expectedStr);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);
            let expectedStr: string = "[9,4,9,4,1,3,2,-6,-1,0]";

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.toString()).to.be.eq(expectedStr);
        })
    })
});
