import { DisjointSet } from './disjoint-set'

export class QuickUnion extends DisjointSet {
    constructor(nVertices: number) {
        super();

        this.parentIDs = new Array(nVertices).map((_: number, i: number) => i);
    }

    find(vertex: number): number {
        if (vertex >= this.parentIDs.length) {
            throw Error();
        } else {
            while (this.parentIDs[vertex] != vertex) {
                vertex = this.parentIDs[vertex];
            }

            return vertex;
        }
    }

    size(): number {
        return this.parentIDs.length;
    }

    union(u: number, v: number): void {
        this.parentIDs[this.find(u)] = this.find(v);
    }

    private parentIDs: Array<number>;
}
