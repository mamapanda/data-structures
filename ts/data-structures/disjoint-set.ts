/**
 * A disjoint set.
 */
export abstract class DisjointSet {
    /**
     * Finds the set ID of the given vertex. An error is
     * thrown if the vertex is not present.
     */
    abstract find(vertex: number): number;

    /**
     * @return the number of vertices in _this_
     */
    abstract size(): number;

    /**
     * Unions the set containing u with the set containing v.
     * The ID of the new set is the ID of the set containing v.
     * @param u a vertex from the first set
     * @param v a vertex from the second set
     */
    abstract union(u: number, v: number): void;

    /**
     * Calculates if there is a path between two vertices.
     * @param u the first vertex
     * @param v the second vertex
     * @return whether a path exists between u and v
     */
    connected(u: number, v: number): boolean {
        return this.find(u) == this.find(v);
    }
}
