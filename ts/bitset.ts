export class BitSet {
    readonly size: number;

    constructor(size: number) {
        this.buffer = new Array((size >> 5) + 1);
        this.buffer.fill(0);

        this.size = size;
    }

    all(): boolean {
        return this.buffer.every(element => element == ~0);
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
        let str: string = "";
        let padStr: string = new Array(33).join('0');

        for (let element of this.buffer) {
            let elemStr: string = (element >>> 0).toString(2); // (-1).toString(2) == "-1"
            let padding: string = padStr.substring(0, 32 - str.length);

            str += padding + elemStr;
        }

        return str;
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
