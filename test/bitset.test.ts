import { expect } from 'chai';
import { BitSet } from '../ts/data-structures';

describe('Bit Set Test', () => {
    describe('constructor', () => {
        it('constructor', () => {
            let bitset: BitSet = new BitSet(0);

            expect(bitset.size).to.be.eq(0);
            expect(bitset.toString()).to.be.eq('');
        });
        it('constructor', () => {
            let bitset: BitSet = new BitSet(5);

            expect(bitset.size).to.be.eq(5);
            expect(bitset.toString()).to.be.eq('00000');
        });
        it('constructor', () => {
            let bitset: BitSet = new BitSet(127);
            let expectedStr: string = new Array(bitset.size + 1).join('0');

            expect(bitset.size).to.be.eq(127);
            expect(bitset.toString()).to.be.eq(expectedStr);
        });
        it('Invalid Input', () => {
            expect(() => new BitSet(-1)).to.throw();
        });
    });
    describe('BitSet::all', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(bitset.all()).to.be.eq(true);
        });
        it('All 0 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            expect(bitset.all()).to.be.eq(false);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < 32; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.all()).to.be.eq(false);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            bitset.update(33, true);
            bitset.update(55, true);
            bitset.update(0, true);
            bitset.update(44, true);

            expect(bitset.all()).to.be.eq(false);
        });
        it('All 1 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.all()).to.be.eq(true);
        });
    });
    describe('BitSet::at', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(() => bitset.at(0)).to.throw();
            expect(bitset.size).to.be.eq(0);
        });
        it('Size 64 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < bitset.size; i += 2) {
                bitset.update(i, true);
            }

            for (let i: number = 0; i < bitset.size; ++i) {
                expect(bitset.at(i)).to.be.eq((i & 1) == 0);
            }

            expect(bitset.size).to.be.eq(64);
        });
        it('Invalid Input', () => {
            [0, 31, 64].forEach(size => {
                let bitset: BitSet = new BitSet(size);

                expect(() => bitset.at(size)).to.throw();
                expect(() => bitset.at(-1)).to.throw();
                expect(() => bitset.at(size + 10)).to.throw();

                expect(bitset.size).to.be.eq(size);
            });
        });
    });
    describe('BitSet::flip', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(() => bitset.flip(0)).to.throw();
            expect(bitset.size).to.be.eq(0);
        });
        it('Size 64 BitSet', () => {
            let size: number = 126;
            let bitset: BitSet = new BitSet(size);

            for (let i: number = 0; i < bitset.size; i += 2) {
                bitset.flip(i);
            }

            for (let i: number = 0; i < bitset.size; i += 3) {
                if ((i & 1) == 0) {
                    bitset.flip(i);
                }
            }

            for (let i: number = 0; i < bitset.size; ++i) {
                expect(bitset.at(i)).to.be.eq((i & 1) == 0 && i % 3 != 0);
            }

            expect(bitset.size).to.be.eq(size);
        });
        it('Invalid Input', () => {
            [0, 31, 64].forEach(size => {
                let bitset: BitSet = new BitSet(size);

                expect(() => bitset.flip(size)).to.throw();
                expect(() => bitset.flip(-1)).to.throw();
                expect(() => bitset.flip(size + 10)).to.throw();

                expect(bitset.size).to.be.eq(size);
            });
        });
    });
    describe('BitSet::none', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(bitset.none()).to.be.eq(true);
        });
        it('All 0 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            expect(bitset.none()).to.be.eq(true);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            bitset.flip(0);

            expect(bitset.none()).to.be.eq(false);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 32; i < bitset.size; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.none()).to.be.eq(false);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.flip(i);
            }

            bitset.flip(33);
            bitset.flip(55);
            bitset.flip(0);
            bitset.flip(44);

            expect(bitset.none()).to.be.eq(false);
        });
        it('All 1 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.flip(i);
            }

            expect(bitset.none()).to.be.eq(false);
        });
    });
    describe('BitSet::reset', () => {
        function testReset(size: number, f: (bitset: BitSet) => void): void {
            let bitset: BitSet = new BitSet(size);

            f(bitset);

            bitset.reset();

            expect(bitset.toString()).to.be.eq(new Array(size + 1).join('0'));
            expect(bitset.size).to.be.eq(size);
        }

        it('Empty BitSet', () => {
            testReset(0, bitset => bitset);
        });
        it('All 0 BitSet', () => {
            testReset(64, bitset => bitset);
        });
        it('Mixed BitSet', () => {
            testReset(64, bitset => {
                for (let i: number = 32; i < bitset.size; ++i) {
                    bitset.update(i, true);
                }
            });
        });
        it('Mixed BitSet', () => {
            testReset(65, bitset => {
                for (let i: number = 0; i < bitset.size; ++i) {
                    bitset.flip(i);
                }

                [0, 33, 44, 55].forEach(i => bitset.flip(i));
            });
        });
        it('All 1 BitSet', () => {
            testReset(64, bitset => {
                for (let i: number = 0; i < bitset.size; ++i) {
                    bitset.flip(i);
                }
            });
        });
    });
    describe('BitSet::some', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(bitset.some()).to.be.eq(false);
        });
        it('All 0 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            expect(bitset.some()).to.be.eq(false);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            bitset.flip(0);

            expect(bitset.some()).to.be.eq(true);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 16; i < bitset.size; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.some()).to.be.eq(true);
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            bitset.flip(bitset.size - 1);

            expect(bitset.some()).to.be.eq(true);
        });
        it('All 1 BitSet', () => {
            let bitset: BitSet = new BitSet(64);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.flip(i);
            }

            expect(bitset.some()).to.be.eq(true);
        });
    });
    describe('BitSet::toString', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(bitset.toString()).to.be.eq("");
        });
        it('All 0 BitSet', () => {
            let bitset: BitSet = new BitSet(9);

            expect(bitset.toString()).to.be.eq("000000000");
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(8);

            for (let i: number = 2; i < 6; ++i) {
                bitset.flip(i);
            }

            expect(bitset.toString()).to.be.eq("00111100");
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(7);

            for (let i: number = 0; i < bitset.size; i += 2) {
                bitset.flip(i);
            }

            bitset.flip(2);

            expect(bitset.toString()).to.be.eq("1000101");
        });
        it('All 1 BitSet', () => {
            let bitset: BitSet = new BitSet(256);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.flip(i);
            }

            expect(bitset.toString()).to.be.eq(new Array(bitset.size + 1).join('1'));
        });
    });
    describe('BitSet::update', () => {
        it('Empty BitSet', () => {
            let bitset: BitSet = new BitSet(0);

            expect(() => bitset.update(0, true)).to.throw();
        });
        it('All 0 BitSet', () => {
            let bitset: BitSet = new BitSet(8);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.update(i, false);
            }

            expect(bitset.toString()).to.be.eq("00000000");
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(8);

            for (let i: number = 2; i < 6; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.toString()).to.be.eq("00111100");
        });
        it('Mixed BitSet', () => {
            let bitset: BitSet = new BitSet(10);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.update(i, true);
            }

            for (let i: number = 0; i < bitset.size; i += 2) {
                bitset.update(i, false);
            }

            for (let i: number = 0; i < bitset.size; i += 3) {
                bitset.update(i, true);
            }

            expect(bitset.toString()).to.be.eq("1101011101");
        });
        it('All 1 BitSet', () => {
            let bitset: BitSet = new BitSet(256);

            for (let i: number = 0; i < bitset.size; ++i) {
                bitset.update(i, true);
            }

            expect(bitset.toString()).to.be.eq(new Array(bitset.size + 1).join('1'));
        });
    });
});
