import { expect } from 'chai';
import { LinkedList } from '../ts/linked-list';

describe('Linked List Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.empty()).to.be.eq(true);
        })
    })
    describe('LinkedList::peekBack', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.peekBack.bind(list)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 3;

            list.add(x);

            expect(list.peekBack()).to.be.eq(x);
            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Multiple-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 2, 4, -1, 6, 0];

            xs.forEach(x => list.add(x))

            expect(list.peekBack()).to.be.deep.equal(xs[xs.length - 1]);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::peekFront', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.peekFront.bind(list)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 3;

            list.add(x);

            expect(list.peekFront()).to.be.eq(x);
            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Multiple-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 2, 4, -1, 6, 0];

            xs.forEach(x => list.add(x))

            expect(list.peekFront()).to.be.equal(xs[0]);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::popBack', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.popBack.bind(list)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(3);
            let x: number = list.popBack();

            expect(list.empty()).to.be.eq(true);
        })
        it('Multiple-Element List', () => {
             let list: LinkedList<string> = new LinkedList<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => list.add(x))
            list.popBack();

            expect(list.toArray()).to.be.deep.equal(["a", "b", "c", "d", "e"]);
        })
    })
    describe('LinkedList::popFront', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.popFront.bind(list)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(3);
            list.popFront();

            expect(list.empty()).to.be.eq(true);
        })
        it('Multiple-Element List', () => {
             let list: LinkedList<string> = new LinkedList<string>();

            ["a", "b", "c", "d", "e", "f"].forEach(x => list.add(x))
            list.popFront();

            expect(list.toArray()).to.be.deep.equal(["b", "c", "d", "e", "f"]);
        })
    })
    describe('LinkedList::pushBack', () => {
        it('Single Input', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.pushBack(x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Multiple Inputs', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.pushBack(x))

            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::pushFront', () => {
        it('Single Input', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.pushFront(x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Multiple Inputs', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.pushFront(x))

            expect(list.toArray()).to.be.deep.equal(xs.reverse());
        })
    })
    describe('LinkedList::add', () => {
        it('Single Input', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.add(x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Multiple Inputs', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::addAt', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.addAt(0, x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Empty List (Invalid Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.addAt(2, 0)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Front of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(0, y);

            expect(list.toArray()).to.be.deep.equal([y, ...xs]);
        })
        it('Middle of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(2, y);

            let rest: number[] = xs.splice(2, xs.length);

            expect(list.toArray()).to.be.deep.equal([...xs, y, ...rest]);
        })
        it('End of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(xs.length, y);

            expect(list.toArray()).to.be.deep.equal([...xs, y]);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.addAt(-1, 5)).to.throw();
            expect(list.toArray()).to.deep.equal(xs);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.addAt(list.size() + 1, 5)).to.throw();
            expect(list.toArray()).to.deep.equal(xs);
        })
    })

    describe('LinkedList::at', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.at(0)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('First Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(list.at(0)).to.be.eq(xs[0]);
        })
        it('Middle Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(list.at(3)).to.be.eq(xs[3]);
        })
        it('Last Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(list.at(xs.length - 1)).to.be.eq(xs[xs.length - 1]);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.at(-1)).to.throw();
            expect(list.toArray()).to.deep.equal(xs);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.at(xs.length + 1)).to.throw();
            expect(list.toArray()).to.deep.equal(xs);
        })
    })
    describe('LinkedList::clear', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.clear();

            expect(list.size()).to.be.eq(0);
        })
        it('Single Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);
            list.clear();

            expect(list.size()).to.be.eq(0);
        })
        it('Multiple Elements', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            [3, -1, 4, 9, 1, 9, 2, -6, 4, 0].forEach(x => list.add(x));
            list.clear();

            expect(list.size()).to.be.eq(0);
        })
    })
    describe('LinkedList::erase', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.erase(0);

            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);
            list.erase(0);

            expect(list.empty()).to.be.eq(true);
        })
        it('Front of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.erase(3);

            expect(list.toArray()).to.be.deep.equal(xs.splice(1, xs.length));
        })
        it('Middle of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(4);
            xs.splice(4, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(xs.length - 1);
            xs.splice(xs.length - 1, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Nonexistent Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));
            list.erase(-99);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::eraseAt', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.eraseAt(0)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);
            list.eraseAt(0);

            expect(list.empty()).to.be.eq(true);
        })
        it('Front of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(0);

            expect(list.toArray()).to.be.deep.equal(xs.splice(1, xs.length));
        })
        it('Middle of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(4);
            xs.splice(4, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(list.size() - 1);
            xs.splice(xs.length - 1, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.eraseAt(-1)).to.throw();
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Out of Bounds', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.eraseAt(list.size())).to.throw();
            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::find', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.find(0)).to.be.eq(false);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);

            expect(list.find(0)).to.be.eq(true);
            expect(list.toArray()).to.be.deep.equal([0]);
        })
        it('Front of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(list.find(xs[0])).to.be.eq(true);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Middle of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(list.find(xs[3])).to.be.eq(true);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(list.find(xs[xs.length - 1])).to.be.eq(true);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Nonexistent Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(list.find(-99)).to.be.eq(false);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::iterator', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.toArray()).to.be.deep.equal([]);
        })
        it('Single Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);

            expect(list.toArray()).to.be.deep.equal([0]);
        })
        it('Multiple Elements', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::size', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.toArray()).to.deep.equal([]);
            expect(list.size()).to.be.eq(0);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 3;

            list.add(x);

            expect(list.toArray()).to.be.deep.equal([x]);
            expect(list.size()).to.be.eq(1);
        })
        it('Multiple-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 2, 4, -1, 6, 0];

            xs.forEach(x => list.add(x))

            expect(list.toArray()).to.be.deep.equal(xs);
            expect(list.size()).to.be.eq(xs.length);
        })
    })
    describe('LinkedList::toString', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(list.toArray()).to.deep.equal([]);
            expect(list.toString()).to.be.eq('[]');
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 3;

            list.add(x);

            expect(list.toArray()).to.be.deep.equal([x]);
            expect(list.toString()).to.be.eq(`[${x}]`);
        })
        it('Multiple-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 2, 4, -1, 6, 0];

            xs.forEach(x => list.add(x))

            expect(list.toArray()).to.be.deep.equal(xs);
            expect(list.toString()).to.be.eq(`[${xs.toString()}]`);
        })
    })
});
