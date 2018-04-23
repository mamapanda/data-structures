import { expect } from 'chai';
import { ListIterator } from './collection';
import { LinkedList } from './linked-list';

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
        it('Empty List (Invalid Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.addAt(list.iterator(), x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Front of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(list.iterator(), y);

            expect(list.toArray()).to.be.deep.equal([y, ...xs]);
        })
        it('Middle of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();
            it.forward();
            it.forward();
            list.addAt(it, y);

            let rest: number[] = xs.splice(2, xs.length);

            expect(list.toArray()).to.be.deep.equal([...xs, y, ...rest]);
        })
        it('End of List (Invalid Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;
            let it: ListIterator<number> = list.iterator(); // already invalid

            xs.forEach(x => list.add(x));
            list.addAt(it, y);

            expect(list.toArray()).to.be.deep.equal([...xs, y]);
        })
        it('Empty List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let x: number = 0;

            list.addAt(0, x);

            expect(list.toArray()).to.be.deep.equal([x]);
        })
        it('Empty List (Invalid Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.addAt(2, 0)).to.throw();
        })
        it('Front of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(0, y);

            expect(list.toArray()).to.be.deep.equal([y, ...xs]);
        })
        it('Middle of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(2, y);

            let rest: number[] = xs.splice(2, xs.length);

            expect(list.toArray()).to.be.deep.equal([...xs, y, ...rest]);
        })
        it('End of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];
            let y: number = 5;

            xs.forEach(x => list.add(x));
            list.addAt(xs.length, y);

            expect(list.toArray()).to.be.deep.equal([...xs, y]);
        })
        it('Negative Index (Out of Bounds) (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.addAt(-1, 5)).to.throw();
        })
        it('Positive Index (Out of Bounds) (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.addAt(list.size() + 1, 5)).to.throw();
        })
    })

    describe('LinkedList::at', () => {
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.at(0)).to.throw();
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
        it('Negative Index (Out of Bounds)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.at(-1)).to.throw();
        })
        it('Positive Index (Out of Bounds)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.at(xs.length + 1)).to.throw();
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
});
