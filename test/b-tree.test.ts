import { expect } from 'chai';
import { BTree, Comparator, defaultCompare } from '../ts/data-structures';

function withTree(f: (tree: BTree<number>) => void) {
    let tree: BTree<number> = new BTree<number>(2);

    for (let i: number = 1; i <= 15; i += 2) {
        tree.add(i);
    }

    for (let i: number = 0; i <= 15; i += 2) {
        tree.add(i);
    }

    f(tree);
}

describe('B-Tree Test', () => {
    describe('constructor', () => {
        it('Minimum Degree', () => {
            let tree: BTree<number> = new BTree<number>(3);

            expect(tree.empty()).to.be.eq(true);
            expect(tree.toString()).to.be.eq('<()>');
        });
        it('Minimum Degree, Comparator', () => {
            let tree: BTree<number> = new BTree<number>(3, defaultCompare);

            expect(tree.empty()).to.be.eq(true);
            expect(tree.toString()).to.be.eq('<()>');
        });
    });
    describe('BTree::max', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.max.bind(tree)).to.throw();
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.max()).to.be.eq(4);
        });
        it('Multiple Elements', () => {
            let tree: BTree<number> = new BTree<number>(2);

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            expect(tree.max()).to.be.eq(9);
        });
        it('Multiple Elements', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BTree<number> = new BTree<number>(2, cmp);

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            expect(tree.max()).to.be.eq(0);
        });
    });
    describe('BTree::min', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.min.bind(tree)).to.throw();
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.min()).to.be.eq(4);
        });
        it('Multiple Elements', () => {
            withTree(tree => {
                expect(tree.min()).to.be.eq(0);
            });
        });
        it('Multiple Elements', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BTree<number> = new BTree<number>(2, cmp);

            [6,1,0,3,4,8,9,7].forEach(x => tree.add(x));

            expect(tree.min()).to.be.eq(9);
        });
    });
    describe('BTree::add', () => {
        it('Single Input', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.toString()).to.be.eq("<(4)>");
        });
        it('Same Input Repeatedly', () => {
            let tree: BTree<number> = new BTree<number>(2);

            for (let i: number = 0; i < 10; ++i) {
                tree.add(4);
            }

            expect(tree.toString()).to.be.eq("<(4)>");
        });
        it('Multiple Inputs', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: BTree<number> = new BTree<number>(2, cmp);

            for (let i: number = 0; i < 3; ++i) {
                tree.add(i);
            }

            expect(tree.toString()).to.be.eq("<(2,1,0)>");
        });
        it('Multiple Inputs', () => {
            withTree(tree => {
                expect(tree.toString()).to.be.eq(
                    "<(8)[(2,5)[(0,1)][(3,4)][(6,7)]]"
                        + "[(11,14)[(9,10)][(12,13)][(15)]]>");
            });
        });
    });
    describe('BTree::clear', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.clear();

            expect(tree.size()).to.be.eq(0);
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(14);

            tree.add(1);
            tree.clear();

            expect(tree.size()).to.be.eq(0);
        });
        it('Multiple Elements', () => {
            withTree(tree => {
                tree.clear();
                expect(tree.empty()).to.be.eq(true);
            })
        });
    });
    describe('BTree::empty', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.empty()).to.be.eq(true);
        });
        it('Single-Element Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(3);

            expect(tree.empty()).to.be.eq(false);
        });
        it('Multiple-Element Tree', () => {
            withTree(tree => {
                expect(tree.empty()).to.be.eq(false);
            });
        });
    });
    describe('BTree::erase', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.erase(11)).to.be.eq(false);

            expect(tree.size()).to.be.eq(0);
        });
        it('Erase Only Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(11);
            expect(tree.erase(11)).to.be.eq(true);

            expect(tree.size()).to.be.eq(0);
        });
        it('Erase From Root', () => {
            withTree(tree => {
                expect(tree.erase(8)).to.be.eq(true);
                expect(tree.erase(7)).to.be.eq(true);
                expect(tree.toString()).to.be.eq(
                    "<(6)[(2,4)[(0,1)][(3)][(5)]]"
                        + "[(11,14)[(9,10)][(12,13)][(15)]]>");
            });
        });
        it('Erase From Internal Node', () => {
            withTree(tree => {
                expect(tree.erase(5)).to.be.eq(true);
                expect(tree.erase(4)).to.be.eq(true);
                expect(tree.erase(6)).to.be.eq(true);
                expect(tree.erase(2)).to.be.eq(true);

                expect(tree.toString()).to.be.eq(
                    "<(8)[(3)[(0,1)][(7)]]"
                        + "[(11,14)[(9,10)][(12,13)][(15)]]>");
            });
        });
        it('Erase From Leaf', () => {
            withTree(tree => {
                expect(tree.erase(3)).to.be.eq(true);
                expect(tree.erase(4)).to.be.eq(true);
                expect(tree.erase(5)).to.be.eq(true);

                expect(tree.toString()).to.be.eq(
                    "<(8)[(1,6)[(0)][(2)][(7)]]"
                        + "[(11,14)[(9,10)][(12,13)][(15)]]>");
            });
        });
        it('Erase From Leaf', () => {
            withTree(tree => {
                expect(tree.erase(3)).to.be.eq(true);
                expect(tree.erase(4)).to.be.eq(true);
                expect(tree.erase(5)).to.be.eq(true);
                expect(tree.erase(6)).to.be.eq(true);
                expect(tree.erase(0)).to.be.eq(true);
                expect(tree.erase(1)).to.be.eq(true);

                expect(tree.toString()).to.be.eq(
                    "<(11)[(8)[(2,7)][(9,10)]][(14)[(12,13)][(15)]]>");
            });
        });
        it('Erase Nonexistent Element', () => {
            withTree(tree => {
                expect(tree.erase(-999)).to.be.eq(false);
            })
        });
    });
    describe('BTree::find', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(99);

            expect(tree.find(0)).to.be.eq(undefined);
        });
        it('Find Only Element', () => {
            let tree: BTree<number> = new BTree<number>(4);

            tree.add(0);

            expect(tree.find(0)).to.be.eq(0);
        });
        it('Find Root', () => {
            withTree(tree => {
                expect(tree.find(8)).to.be.eq(8);
            });
        });
        it('Find Internal Node', () => {
            withTree(tree => {
                expect(tree.find(14)).to.be.eq(14);
            });
        });
        it('Find Leaf Node', () => {
            withTree(tree => {
                expect(tree.find(3)).to.be.eq(3);
            });
        });
        it('Find Nonexistent Element', () => {
            withTree(tree => {
                tree.erase(5);
                expect(tree.find(5)).to.be.eq(undefined);
            });
        });
    });
    describe('BTree::iterator', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.toArray()).to.be.deep.equal([]);
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.toArray()).to.be.deep.equal([4]);
        });
        it('Multiple Elements', () => {
            let xs: number[] = [];

            for (let i: number = 0; i <= 15; ++i) {
                xs.push(i);
            }

            withTree(tree => {
                expect(tree.toArray()).to.be.deep.equal(xs);
            });
        });
    });
    describe('BTree::size', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.size()).to.be.eq(0);
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.size()).to.be.eq(1);
        });
        it('Multiple Elements', () => {
            withTree(tree => {
                expect(tree.size()).to.be.eq(16);
            });
        });
    });
    describe('BTree::toString', () => {
        it('Empty Tree', () => {
            let tree: BTree<number> = new BTree<number>(2);

            expect(tree.toString()).to.be.eq('<()>');
        });
        it('Single Element', () => {
            let tree: BTree<number> = new BTree<number>(2);

            tree.add(4);

            expect(tree.toString()).to.be.eq('<(4)>');
        });
        it('Multiple Elements', () => {
            withTree(tree => {
                expect(tree.toString()).to.be.eq(
                    "<(8)[(2,5)[(0,1)][(3,4)][(6,7)]]"
                        + "[(11,14)[(9,10)][(12,13)][(15)]]>");
            });
        });
    });
});
