import { DisjointSet } from './disjoint-set'

/**
 * A disjoint set based on quick union.
 */
export class QuickUnion extends DisjointSet {
    /**
     * The constructor.
     * @param nVertices the number of vertices to use
     */
    constructor(nVertices: number) {
        super();

        this.parentIDs = new Array(nVertices);

        for (let i: number = 0; i < nVertices; ++i) {
            this.parentIDs[i] = i;
        }
    }

    /**
     * See parent documentation.
     */
    find(vertex: number): number {
        if (vertex < 0 || vertex >= this.parentIDs.length) {
            throw Error();
        } else {
            while (this.parentIDs[vertex] != vertex) {
                vertex = this.parentIDs[vertex];
            }

            return vertex;
        }
    }

    /**
     * See parent documentation.
     */
    size(): number {
        return this.parentIDs.length;
    }

    /**
     * See parent documentation.
     */
    union(u: number, v: number): void {
        this.parentIDs[this.find(u)] = this.find(v);
    }

    /**
     * An array such that array[vertex] gives the parent vertex in quick union.
     * If the vertex is a tree root, then array[vertex] == vertex.
     */
    private parentIDs: Array<number>;
}
