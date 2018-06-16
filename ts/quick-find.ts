import { DisjointSet } from './disjoint-set'

export class QuickFind extends DisjointSet {
    constructor(nVertices: number) {
        super();

        this.setIDs = new Array(nVertices).map((_: number, i: number) => i);
    }

    find(vertex: number): number {
        if (vertex >= this.setIDs.length) {
            throw Error();
        } else {
            return this.setIDs[vertex];
        }
    }

    size(): number {
        return this.setIDs.length;
    }

    union(u: number, v: number): void {
        let vID: number = this.find(v);

        for (let i: number = 0; i < this.setIDs.length; ++i) {
            if (this.setIDs[i] == this.find(u)) {
                this.setIDs[i] = vID;
            }
        }
    }

    private setIDs: Array<number>;
}
