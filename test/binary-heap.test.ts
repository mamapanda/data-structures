import { expect } from 'chai';
import { BinaryHeap, Comparator, defaultCompare } from '../ts/data-structures';

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
    describe('BinaryHeap::erase', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.erase(0);

            expect(heap.empty()).to.be.eq(true);
        })
        it('Erase Only Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(0);
            heap.erase(0);

            expect(heap.empty()).to.be.eq(true);
        })
        it('Erase Min (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [6,1,0,3,4,8,9,7].forEach(x => heap.add(x))
            heap.erase(heap.min());

            expect(heap.toArray()).to.be.deep.equal([8, 7, 6, 4, 3, 0, 1]);
        })
        it('Erase Internal Node', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));
            heap.erase(-1);

            expect(heap.toArray()).to.be.deep.equal([-6, 0, 2, 1, 3, 9, 4, 9, 4]);
        })
        it('Erase Leaf Node', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));
            heap.erase(3);

            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4]);
        })
        it('Erase Nonexistent Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            heap.erase(-99);

            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
        })
    })
    describe('BinaryHeap::find', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.find(0)).to.be.eq(false);
        })
        it('Find Only Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            heap.add(0);

            expect(heap.find(0)).to.be.eq(true);
        })
        it('Find Min', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.find(heap.min())).to.be.eq(true);
        })
        it('Find Internal Node (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let heap: BinaryHeap<number> = new BinaryHeap<number>(cmp);

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.find(-1)).to.be.eq(true);
        })
        it('Find Leaf Node', () => {
            let heap: BinaryHeap<string> = new BinaryHeap<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => heap.add(x));

            expect(heap.find("f")).to.be.eq(true);
        })
        it('Find Nonexistent Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.find(5)).to.be.eq(false);
        })
    })
    describe('BinaryHeap::iterator', () => {
        it('Empty Heap', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            expect(heap.toArray()).to.be.deep.equal([]);
        })
        it('Single Element', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();
            heap.add(0);

            expect(heap.toArray()).to.be.deep.equal([0]);
        })
        it('Multiple Elements', () => {
            let heap: BinaryHeap<number> = new BinaryHeap<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => heap.add(x));

            expect(heap.toArray()).to.be.deep.equal([-6, -1, 2, 1, 0, 9, 4, 9, 4, 3]);
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
