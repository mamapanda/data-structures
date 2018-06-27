import { expect } from 'chai';
import { SkipList, Comparator, defaultCompare } from '../ts/data-structures';

// provide a seeded Math.random for consistent testing
let originalRandom = Math.random;
// stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
Math.random = (function(seed: number) {
    return () => {
        let x: number = Math.sin(seed++) * 10000;

        return x - Math.floor(x);
    }
})(1);

function sort(xs: number[]): number[] {
    return xs.sort((a, b) => a - b);
}

describe('Skip List Test', () => {
    describe('constructor', () => {
        it('No Arguments', () => {
            let list: SkipList<number> = new SkipList<number>();

            expect(list.empty()).to.be.eq(true);
        });
        it('One Argument', () => {
            let list: SkipList<number> = new SkipList<number>(defaultCompare);

            expect(list.empty()).to.be.eq(true);
        });
    });
    describe('SkipList::add', () => {
        function testAdd(testName: string,
                         xs: number[],
                         cmp: Comparator<number> = defaultCompare): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>(cmp);

                xs.forEach(x => list.add(x));

                expect(list.toArray()).to.be.deep.equal(xs.sort(cmp));
            });
        }

        testAdd('Single Input', [3]);
        testAdd('Same Input Repeatedly', [3, 3, 3, 3, 3]);
        testAdd('Sorted Input', [0, 1, 2, 3, 4]);
        testAdd('Reverse Sorted Input', [0, 1, 2, 3, 4, 5, 6],
                (lhs, rhs) => defaultCompare(rhs, lhs));
        testAdd('Unsorted Input', [15, 33, -2, 4, 0, -2, 10, 34]);
    });
    describe('SkipList::at', () => {
        function testAt(testName: string, xs: number[], index: number): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.at(index)).to.be.eq(sort(xs)[index]);
            });
        }

        it('Empty List', () => {
            let list: SkipList<number> = new SkipList<number>();

            expect(() => list.at(0)).to.throw();
        });
        testAt('Single-Element List', [2], 0);
        testAt('First Element', [15, 33, -2, 4, 0, 10, 34], 0);
        testAt('Middle Element', [15, 33, -2, 4, 0, 10, 34], 3);
        testAt('Last Element', [15, 33, -2, 4, 0, 10, 34], 6);
        it('Out of Bounds', () => {
            let list: SkipList<number> = new SkipList<number>();
            let xs: number[] = [15, 33, -2, 4, 0, 10, 34];

            xs.forEach(x => list.add(x));

            expect(() => list.at(-1)).to.throw();
            expect(() => list.at(xs.length)).to.throw();
        });
    });
    describe('SkipList::clear', () => {
        function testClear(testName: string, xs: number[]): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                list.clear();

                expect(list.empty()).to.be.eq(true);
            });
        }

        testClear('Empty List', []);
        testClear('Single Element', [1]);
        testClear('Multiple Elements', [3, 2, 5, 1, 29, 0, 9, 9, 9]);
    });
    describe('SkipList::empty', () => {
        function testEmpty(testName: string, xs: number[]): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.empty()).to.be.eq(xs.length == 0);
            });
        }

        testEmpty('Empty List', []);
        testEmpty('Single-Element List', [0]);
        testEmpty('Multiple-Element List', [3, 2, 15, 10, 0, 4]);
    });
    describe('SkipList::erase', () => {
        function testErase(testName: string, xs: number[], index: number): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                sort(xs);
                list.erase(xs[index]);
                xs.splice(index, 1);

                expect(list.toArray()).to.be.deep.equal(xs);
            });
        }

        it('Empty List', () => {
            let list: SkipList<number> = new SkipList<number>();

            list.erase(0);

            expect(list.toArray()).to.be.deep.equal([]);
        });
        testErase('Single-Element List', [3], 0);
        testErase('Front of List', [15, 33, -2, 4, 0, -2, 10, 34], 0);
        testErase('Middle of List', [15, 33, -2, 4, 0, -2, 10, 34], 4);
        testErase('End of List', [15, 33, -2, 4, 0, -2, 10, 34], 7);
        it('Nonexistent Element', () => {
            let list: SkipList<number> = new SkipList<number>();
            let xs: number[] = [15, 33, -2, 4, 0, -2, 10, 34];

            xs.forEach(x => list.add(x));

            list.erase(999);

            expect(list.toArray()).to.be.deep.equal(sort(xs));
        });
    });
    describe('SkipList::eraseAt', () => {
        function testEraseAt(testName: string, xs: number[], index: number): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                list.eraseAt(index);

                sort(xs);
                xs.splice(index, 1);

                expect(list.toArray()).to.be.deep.equal(xs);
            });
        }

        it('Empty List', () => {
            let list: SkipList<number> = new SkipList<number>();

            expect(() => list.eraseAt(0)).to.throw();
            expect(list.toArray()).to.be.deep.equal([]);
        });
        testEraseAt('Single-Element List', [3], 0);
        testEraseAt('Front of List', [15, 33, -2, 4, 0, -2, 10, 34], 0);
        testEraseAt('Middle of List', [15, 33, -2, 4, 0, -2, 10, 34], 4);
        testEraseAt('End of List', [15, 33, -2, 4, 0, -2, 10, 34], 7);
        it('Out of Bounds', () => {
            let list: SkipList<number> = new SkipList<number>();
            let xs: number[] = [15, 33, -2, 4, 0, -2, 10, 34];

            xs.forEach(x => list.add(x));

            expect(() => list.eraseAt(-1)).to.throw();
            expect(() => list.eraseAt(10000)).to.throw();
            expect(list.toArray()).to.be.deep.equal(sort(xs));
        });
    });
    describe('SkipList::find', () => {
        function testFind(testName: string, xs: number[], value: number): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.find(value)).to.be.eq(xs.some(x => x == value));
            });
        }

        testFind('Empty List', [], 0);
        testFind('Single-Element List', [0], 0);
        testFind('Front of List', [15, 33, -2, 4, 0, -2, 10, 34], 15);
        testFind('Middle of List', [15, 33, -2, 4, 0, -2, 10, 34], 4);
        testFind('End of List', [15, 33, -2, 4, 0, -2, 10, 34], 34);
        testFind('Nonexistent Element', [15, 33, -2, 4, 0, -2, 10, 34], -9999);
    });
    describe('SkipList::iterator', () => {
        function testIterator(testName: string, xs: number[]): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.toArray()).to.be.deep.equal(sort(xs));
            });
        }

        testIterator('Empty List', []);
        testIterator('Single-Element List', [3]);
        testIterator('Multiple-Element List', [15, 33, -2, 4, 0, -2, 10, 34]);
    });
    describe('SkipList::size', () => {
        function testSize(testName: string, xs: number[]): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.size()).to.be.eq(xs.length);
            });
        }

        testSize('Empty List', []);
        testSize('Single-Element List', [3]);
        testSize('Multiple-Element List', [15, 33, -2, 4, 0, -2, 10, 34]);
    });
    describe('SkipList::toString', () => {
        function testToString(testName: string, xs: number[]): void {
            it(testName, () => {
                let list: SkipList<number> = new SkipList<number>();

                xs.forEach(x => list.add(x));

                expect(list.toString()).to.be.eq(`[${sort(xs).toString()}]`);
            });
        }

        testToString('Empty List', []);
        testToString('Single-Element List', [3]);
        testToString('Multiple-Element List', [15, 33, -2, 4, 0, -2, 10, 34]);
    });
});

Math.random = originalRandom // restore Math.random
