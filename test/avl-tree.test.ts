import { expect } from 'chai';
import { AVLTree, Comparator, defaultCompare } from '../ts/data-structures';

describe('AVL Tree Test', () => {
    describe('default constructor', () => {
        it('default constructor', () => {
            let tree: AVLTree<number> = new AVLTree<number>();

            expect(tree.toString()).to.be.eq("<>");
            expect(tree.size()).to.be.eq(0);
        })
    })
    describe('AVLTree::add', () => {
        it('Single Input', () => {
            let tree: AVLTree<number> = new AVLTree<number>();

            tree.add(3);

            expect(tree.toString()).to.be.eq("<3[][]>");
            expect(tree.size()).to.be.eq(1);
        })
        it('Same Input Repeatedly', () => {
            let tree: AVLTree<number> = new AVLTree<number>();

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq("<0[][]>")
            expect(tree.size()).to.be.eq(1);
        })
        it('Sorted Input', () => {
            let tree: AVLTree<string> = new AVLTree<string>();
            let expectedStr: string = "<d[b[a[][]][c[][]]][e[][f[][]]]>";

            ["a", "b", "c", "d", "e", "f"].forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(6);
        })
        it('Unsorted Input (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: AVLTree<number> = new AVLTree<number>(cmp);
            let xs: number[] = [-32, -45, -34, -67, -98, -124, -5, -25, -29, -234, -1];
            let expectedStr: string = "<-32[-25[-5[-1[][]][]][-29[][]]]"
                + "[-67[-34[][-45[][]]][-124[-98[][]][-234[][]]]]>";

            xs.forEach(x => tree.add(x));

            expect(tree.toString()).to.be.eq(expectedStr);
            expect(tree.size()).to.be.eq(xs.length);
        })
    })
    describe('AVLTree::erase', () => {
        it('Empty Tree', () => {
            let tree: AVLTree<number> = new AVLTree<number>();

            tree.erase(0);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Only Element', () => {
            let tree: AVLTree<number> = new AVLTree<number>();

            tree.add(0);
            tree.erase(0);

            expect(tree.empty()).to.be.eq(true);
        })
        it('Erase Root', () => {
            let tree: AVLTree<number> = new AVLTree<number>();
            let xs: number[] = [32, 45, 34, 67, 98, 124, 5, 25, 29, 234, 1];
            let expectedStr: string = "<34[25[5[1[][]][]][29[][]]]"
                + "[67[45[][]][124[98[][]][234[][]]]]>";

            xs.forEach(x => tree.add(x));
            tree.erase(32);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Internal Node', () => {
            let tree: AVLTree<number> = new AVLTree<number>();
            let xs: number[] = [32, 45, 34, 67, 98, 124, 5, 25, 29, 234, 1];
            let expectedStr: string = "<32[5[1[][]][29[][]]]"
                + "[67[34[][45[][]]][124[98[][]][234[][]]]]>";

            xs.forEach(x => tree.add(x));
            tree.erase(25);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Leaf (Reversed Comparator)', () => {
            let cmp: Comparator<number> = (lhs, rhs) => defaultCompare(rhs, lhs);
            let tree: AVLTree<number> = new AVLTree<number>(cmp);
            let xs: number[] = [-32, -45, -34, -67, -98, -124, -5, -25, -29, -234, -1];
            let expectedStr: string = "<-32[-5[-1[][]][-25[][]]]"
                + "[-67[-34[][-45[][]]][-124[-98[][]][-234[][]]]]>";

            xs.forEach(x => tree.add(x));
            tree.erase(-29);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
        it('Erase Nonexistent Element', () => {
            let tree: AVLTree<number> = new AVLTree<number>();
            let xs: number[] = [32, 45, 34, 67, 98, 124, 5, 25, 29, 234, 1];
            let expectedStr: string = "<32[25[5[1[][]][]][29[][]]]"
                + "[67[34[][45[][]]][124[98[][]][234[][]]]]>";

            xs.forEach(x => tree.add(x));
            tree.erase(-99);

            expect(tree.toString()).to.be.eq(expectedStr);
        })
    })
});
