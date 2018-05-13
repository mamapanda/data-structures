import { expect } from 'chai';
import { ListIterator } from '../ts/collection';
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

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();
            it.back();

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
            expect(list.toArray()).to.deep.equal([]);
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
        it('Out of Bounds (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, 4, -1, 2, 3, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.addAt(-1, 5)).to.throw();
            expect(list.toArray()).to.deep.equal(xs);
        })
        it('Out of Bounds (Index)', () => {
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
    describe('LinkedList::eraseAt', () => {
        it('Empty List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.eraseAt(list.iterator())).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);
            list.eraseAt(list.iterator());

            expect(list.empty()).to.be.eq(true);
        })
        it('Front of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(list.iterator());

            expect(list.toArray()).to.be.deep.equal(xs.splice(1, xs.length));
        })
        it('Middle of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(list.find(xs[4]));
            xs.splice(4, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(list.find(xs[xs.length - 1]));
            xs.splice(xs.length - 1, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Out of Bounds (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();
            it.back();

            expect(() => list.eraseAt(it)).to.throw();
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Empty List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            expect(() => list.eraseAt(0)).to.throw();
            expect(list.toArray()).to.deep.equal([]);
        })
        it('Single-Element List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);
            list.eraseAt(0);

            expect(list.empty()).to.be.eq(true);
        })
        it('Front of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(0);

            expect(list.toArray()).to.be.deep.equal(xs.splice(1, xs.length));
        })
        it('Middle of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(4);
            xs.splice(4, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            list.eraseAt(list.size() - 1);
            xs.splice(xs.length - 1, 1);

            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Out of Bounds (Index)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            expect(() => list.eraseAt(-1)).to.throw();
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Out of Bounds (Index)', () => {
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

            expect(list.find(0)).to.be.eq(null);
        })
        it('Single-Element List', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);

            let it: ListIterator<number> = list.find(0);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
            expect(list.toArray()).to.be.deep.equal([0]);
        })
        it('Front of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.find(xs[0]);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(xs[0]);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Middle of List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.find(xs[3]);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(xs[3]);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('End of List (Iterator)', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.find(xs[xs.length - 1]);

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(xs[xs.length - 1]);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
        it('Nonexistent Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.find(5);

            expect(it).to.be.eq(null);
            expect(list.toArray()).to.be.deep.equal(xs);
        })
    })
    describe('LinkedList::iterator', () => {
        it('Access Invalid Iterator', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let it: ListIterator<number> = list.iterator();

            expect(it.valid()).to.be.eq(false);
            expect(it.value.bind(it)).to.throw();
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(list);
        })
        it('Empty List', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let it: ListIterator<number> = list.iterator();

            expect(it.valid()).to.be.eq(false);
        })
        it('Single Element', () => {
            let list: LinkedList<number> = new LinkedList<number>();

            list.add(0);

            let it: ListIterator<number> = list.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(0);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(list);
            expect(it.valid()).to.be.eq(true);

            it.forward();

            expect(it.valid()).to.be.eq(false);
        })
        it('Iterate Forward', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();

            expect(it).to.be.not.eq(null);
            expect(it.value()).to.be.eq(3);
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(true);
            expect(it.source()).to.be.eq(list);
            expect(it.valid()).to.be.eq(true);

            let output: number[] = [];

            while (it.valid()) {
                output.push(it.value());
                it.forward();
            }

            expect(it.value.bind(it)).to.throw();
            expect(it.hasPrevious()).to.be.eq(false);
            expect(it.hasNext()).to.be.eq(false);
            expect(it.source()).to.be.eq(list);
            expect(it.valid()).to.be.eq(false);

            expect(output).to.be.deep.equal(xs);
        })
        it('Iterate Forward then Backward', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();

            let forwardOutput: number[] = [];
            let backwardOutput: number[] = [];

            while (it.hasNext()) {
                forwardOutput.push(it.value());
                it.forward();
            }
            if (it.valid()) {
                forwardOutput.push(it.value());
            }

            expect(forwardOutput).to.be.deep.equal(xs);

            while (it.hasPrevious()) {
                backwardOutput.push(it.value());
                it.back();
            }
            if (it.valid()) {
                backwardOutput.push(it.value());
            }

            it.back();
            expect(it.valid()).to.be.eq(false);

            expect(backwardOutput).to.be.deep.equal(xs.reverse());
        })
        it('Change All List Values', () => {
            let list: LinkedList<number> = new LinkedList<number>();
            let xs: number[] = [3, -1, 4, 9, 1, 9, 2, -6, 4, 0];

            xs.forEach(x => list.add(x));

            let it: ListIterator<number> = list.iterator();
            let i: number = 0;
            let expected: number[] = [];

            while (it.valid()) {
                it.setValue(i);
                expected.push(i);

                it.forward();
                ++i;
            }

            expect(it.valid()).to.be.eq(false);
            expect(list.toArray()).to.be.deep.equal(expected);
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
