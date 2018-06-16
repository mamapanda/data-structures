export abstract class DisjointSet {
    abstract find(vertex: number): number;
    abstract size(): number;
    abstract union(u: number, v: number): void;

    connected(u: number, v: number): boolean {
        return this.find(u) == this.find(v);
    }
}
