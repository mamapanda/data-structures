import { DisjointSet } from './disjoint-set'

export class QuickFind extends DisjointSet {
    constructor(nVertices: number) {
        super();

        this.setIDs = new Array(nVertices);

        for (let i: number = 0; i < nVertices; ++i) {
            this.setIDs[i] = i;
        }
    }

    find(vertex: number): number {
        if (vertex < 0 || vertex >= this.setIDs.length) {
            throw Error();
        } else {
            return this.setIDs[vertex];
        }
    }

    size(): number {
        return this.setIDs.length;
    }

    union(u: number, v: number): void {
        let uID: number = this.find(u);
        let vID: number = this.find(v);

        for (let i: number = 0; i < this.setIDs.length; ++i) {
            if (this.setIDs[i] == uID) {
                this.setIDs[i] = vID;
            }
        }
    }

    private setIDs: Array<number>;
}
