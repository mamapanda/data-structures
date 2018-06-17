import { expect } from 'chai';
import { DisjointSet } from '../ts/disjoint-set';
import { QuickFind } from '../ts/quick-find';
import { QuickUnion } from '../ts/quick-union';

function testDisjointSet(ctor: new (n: number) => DisjointSet) {
    it('Empty Set', () => {
        let ds: DisjointSet = new ctor(0);

        expect(ds.size()).to.be.eq(0);
        expect(() => ds.find(0)).to.throw();
        expect(() => ds.union(0, 0)).to.throw();
    })
    it('Single Vertex', () => {
        let ds: DisjointSet = new ctor(1);

        ds.union(0, 0);

        expect(ds.size()).to.be.eq(1);
        expect(ds.find(0)).to.be.eq(0);
    })
    it('Multiple Vertices', () => {
        let ds: DisjointSet = new ctor(10);
        let components: number[][] = [
            [0, 1, 3, 4],
            [2, 5, 6],
            [7, 8],
            [9]
        ];

        for (let component of components) {
            for (let i: number = 1; i < component.length; ++i) {
                ds.union(component[0], component[i]);
            }
        }

        for (let component of components) {
            let componentID: number = component[component.length - 1];

            for (let vertex of component) {
                expect(ds.find(vertex)).to.be.eq(componentID);
            }
        }

        expect(ds.size()).to.be.eq(10);
    })
    it('Connected Graph', () => {
        let ds: DisjointSet = new ctor(10);

        for (let i: number = 1; i < ds.size(); ++i) {
            ds.union(0, i);
        }

        for (let i: number = 0; i < ds.size(); ++i) {
            expect(ds.find(i)).to.be.eq(9);
        }

        expect(ds.size()).to.be.eq(10);
    })
    it('Invalid Input', () => {
        expect(() => new ctor(-1)).to.throw();

        let ds: DisjointSet = new ctor(10);

        expect(() => ds.union(10, 0)).to.throw();
        expect(() => ds.union(3, 14)).to.throw();
        expect(() => ds.union(-1, 3)).to.throw();
        expect(() => ds.union(3, -3)).to.throw();
        expect(() => ds.union(-1, 14)).to.throw();

        expect(() => ds.find(-1)).to.throw();
        expect(() => ds.find(10)).to.throw();
    })
}

describe('Disjoint Set Test', () => {
    describe('Quick Find', () => testDisjointSet(QuickFind));
    describe('Quick Union', () => testDisjointSet(QuickUnion));
});
