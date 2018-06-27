import { DisjointSet } from './disjoint-set'

/**
 * A disjoint set based on quick find.
 */
export class QuickFind extends DisjointSet {
    /**
     * the constructor.
     * @param nVertices the number of vertices to use
     */
    constructor(nVertices: number) {
        super();

        this.setIDs = new Array(nVertices);

        for (let i: number = 0; i < nVertices; ++i) {
            this.setIDs[i] = i;
        }
    }

    /**
     * See parent documentation.
     */
    find(vertex: number): number {
        if (vertex < 0 || vertex >= this.setIDs.length) {
            throw Error();
        } else {
            return this.setIDs[vertex];
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        return this.setIDs.length;
    }

    /**
     * See parent documentation.
     */
    union(u: number, v: number): void {
        let uID: number = this.find(u);
        let vID: number = this.find(v);

        for (let i: number = 0; i < this.setIDs.length; ++i) {
            if (this.setIDs[i] == uID) {
                this.setIDs[i] = vID;
            }
        }
    }

    /**
     * An array such that array[vertex] gives the set ID of the vertex.
     */
    private setIDs: Array<number>;
}
