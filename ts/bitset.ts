export class BitSet {
    readonly size: number;

    constructor(size: number) {
        if (size < 0) {
            throw Error();
        }

        this.buffer = new Array((size >> 5) + 1);
        this.buffer.fill(0);

        this.size = size;
    }

    all(): boolean {
        for (let i: number = 0; i < this.size; ++i) {
            if (!this.at(i)) {
                return false;
            }
        }

        return true;
    }

    at(index: number): boolean {
        let [i, j]: [number, number] = this.position(index);
        let bit: number = this.buffer[i] & (1 << j);

        return bit != 0;
    }

    flip(index: number): void {
        this.update(index, !this.at(index));
    }

    none(): boolean {
        return !this.some();
    }

    reset(): void {
        this.buffer.fill(0);
    }

    some(): boolean {
        return this.buffer.some(element => element != 0);
    }

    toString(): string {
        let buffer: string[] = [];

        for (let i: number = 0; i < this.size; ++i) {
            buffer.push(this.at(i) ? '1' : '0');
        }

        return buffer.join('');
    }

    update(index: number, value: boolean): void {
        let [i, j]: [number, number] = this.position(index);

        if (value) {
            this.buffer[i] |= (1 << j);
        } else {
            this.buffer[i] &= ~(1 << j);
        }
    }

    private buffer: number[];

    private position(index: number): [number, number] {
        if (index < 0 || index >= this.size) {
            throw Error();
        }

        let bufferIndex: number = index >> 5;
        let leftShiftAmount: number = 31 - (index % 32);

        return [bufferIndex, leftShiftAmount];
    }

}
