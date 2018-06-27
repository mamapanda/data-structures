import { expect } from 'chai';
import { HashTable } from '../ts/data-structures';

function modHash(divisor: number, multiplier: number = 1) {
    return (x: number) => (multiplier * x) % divisor;
}

describe('Hash Table Test', () => {
    describe('constructor', () => {
        it('constructor', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            expect(table.toArray()).to.be.deep.equal([]);
            expect(table.size()).to.be.eq(0);
        });
    });
    describe('HashTable::add', () => {
        it('Single Input', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(5);

            expect(table.size()).to.be.eq(1);
            expect(table.toString()).to.be.eq('[5]');
        });
        it('Same Input Repeatedly', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            for (let i: number = 0; i < 10; ++i) {
                table.add(3);
            }

            expect(table.size()).to.be.eq(1);
            expect(table.toString()).to.be.eq('[,,,3]');
        });
        it('Multiple Inputs', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));

            expect(table.size()).to.be.eq(9);
            expect(table.toString()).to.be.eq('[10,31,1,3,14,5,26,7,34]');
        });
        it('Multiple Inputs', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 10, 31].forEach(x => table.add(x));

            table.erase(5);
            table.add(34);

            expect(table.size()).to.be.eq(8);
            expect(table.toString()).to.be.eq('[10,31,1,3,14,34,26,7]');
        });
        it('Multiple Inputs', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));
            let xs: number[] = [];

            for (let i: number = 0; i < 1000; ++i) {
                table.add(i);
                xs.push(i);
            }

            expect(table.toString()).to.be.eq(`[${xs.toString()}]`);
            expect(table.size()).to.be.eq(1000);
        });
    });
    describe('HashTable::clear', () => {
        it('Empty Table', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.clear();

            expect(table.empty()).to.be.eq(true);
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);

            table.clear();

            expect(table.empty()).to.be.eq(true);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            for (let i: number = 0; i < 100; ++i) {
                table.add(i);
            }

            table.clear();

            expect(table.empty()).to.be.eq(true);
        });
    });
    describe('HashTable::erase', () => {
        it('Empty Table', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.erase(10);

            expect(table.empty()).to.be.eq(true);
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);
            table.erase(4);

            expect(table.empty()).to.be.eq(true);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));
            table.erase(10);

            expect(table.size()).to.be.eq(8);

            expect(table.toString()).to.be.eq('[,31,1,3,14,5,26,7,34]');
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));
            table.erase(34);

            expect(table.size()).to.be.eq(8);

            expect(table.toString()).to.be.eq('[10,31,1,3,14,5,26,7,]');
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 3, 7, 1, 34, 10, 31, 9].forEach(x => table.add(x));
            table.erase(14);
            table.erase(34);

            expect(table.size()).to.be.eq(7);

            expect(table.toString()).to.be.eq('[10,31,1,3,,,26,7,,9]');
        });
        it('Nonexistent Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));
            table.erase(-10);

            expect(table.size()).to.be.eq(9);

            expect(table.toString()).to.be.eq('[10,31,1,3,14,5,26,7,34]');
        });
    });
    describe('HashTable::find', () => {
        it('Empty Table', () => {
             let table: HashTable<number> = new HashTable<number>(modHash(5));

             expect(table.find(10)).to.be.eq(false);
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);

            expect(table.find(4)).to.be.eq(true);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));

            expect(table.find(10)).to.be.eq(true);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));

            expect(table.find(34)).to.be.eq(true);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 3, 7, 1, 34, 10, 31, 9].forEach(x => table.add(x));
            table.erase(14);

            expect(table.find(34)).to.be.eq(true);
        });
        it('Nonexistent Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 5, 1, 34, 10, 31].forEach(x => table.add(x));

            expect(table.find(-10)).to.be.eq(false);
        });
    });
    describe('HashTable::iterator', () => {
        it('Empty Table', () => {
             let table: HashTable<number> = new HashTable<number>(modHash(5));

            expect(table.toArray()).to.be.deep.equal([]);
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);

            expect(table.toArray()).to.be.deep.equal([4]);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 1, 34, 10].forEach(x => table.add(x));

            expect(table.toArray()).to.be.deep.equal([10,31,1,3,14,5,26,7,34]);
        });
    });
    describe('HashTable::size', () => {
        it('Empty Table', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            expect(table.size()).to.be.eq(0);
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);

            expect(table.size()).to.be.eq(1);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 1, 34, 10].forEach(x => table.add(x));

            expect(table.size()).to.be.eq(9);
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 5, 3, 7, 1, 34].forEach(x => table.add(x));

            expect(table.size()).to.be.eq(7);
        });
    });
    describe('HashTable::toString', () => {
        it('Empty Table', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            expect(table.toString()).to.be.eq('[]');
        });
        it('Single Element', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(5));

            table.add(4);

            expect(table.toString()).to.be.eq('[,,,,4]');
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 1, 34, 10].forEach(x => table.add(x));

            expect(table.toString()).to.be.eq('[10,31,1,3,14,5,26,7,34]');
        });
        it('Multiple Elements', () => {
            let table: HashTable<number> = new HashTable<number>(modHash(10));

            [14, 31, 26, 5, 3, 7, 1, 34].forEach(x => table.add(x));
            table.erase(26);

            expect(table.toString()).to.be.eq('[,31,1,3,14,5,,7,34]');
        });
    });
});
