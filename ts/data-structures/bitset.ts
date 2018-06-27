/**
 * A bit set.
 */
export class BitSet {
    /**
     * The number of bits in _this_.
     */
    readonly size: number;

    /**
     * The constructor.
     * @param size the number of bits to hold in _this_.
     */
    constructor(size: number) {
        if (size < 0) {
            throw Error();
        }

        this.buffer = new Array((size >> 5) + 1);
        this.buffer.fill(0);

        this.size = size;
    }

    /**
     * @return whether all bits in _this_ are set
     */
    all(): boolean {
        for (let i: number = 0; i < this.size; ++i) {
            if (!this.at(i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Finds the bit at the given index. An error is thrown if the index
     * is out of bounds.
     * @param index the index
     * @return whether the bit is set
     */
    at(index: number): boolean {
        let [i, j]: [number, number] = this.position(index);
        let bit: number = this.buffer[i] & (1 << j);

        return bit != 0;
    }

    /**
     * Flips the bit at the given index. An error is thrown if the index
     * is out of bounds.
     * @param index the index
     */
    flip(index: number): void {
        this.update(index, !this.at(index));
    }

    /**
     * @return whether none of the bits in _this_ are set
     */
    none(): boolean {
        return !this.some();
    }

    /**
     * Zeroes out all bits in _this_.
     */
    reset(): void {
        this.buffer.fill(0);
    }

    /**
     * @return whether there is at least one set bit in _this_
     */
    some(): boolean {
        return this.buffer.some(element => element != 0);
    }

    /**
     * @return a string representation of this
     */
    toString(): string {
        let buffer: string[] = [];

        for (let i: number = 0; i < this.size; ++i) {
            buffer.push(this.at(i) ? '1' : '0');
        }

        return buffer.join('');
    }

    /**
     * Changes the bit at the given index. An error is thrown if
     * the index is out of bounds.
     * @param index the index
     * @param value true to set the bit to 1, false to set the bit to 0
     */
    update(index: number, value: boolean): void {
        let [i, j]: [number, number] = this.position(index);

        if (value) {
            this.buffer[i] |= (1 << j);
        } else {
            this.buffer[i] &= ~(1 << j);
        }
    }

    /**
     * A buffer of numbers to hold the bits.
     */
    private buffer: number[];

    /**
     * Finds the position of the bit at the given index inside
     * _this_.buffer. The position is given in terms of the index inside
     * _this_.buffer and a right shift amount, such that shifting 1 right
     * by that amount places the set bit in 1 at the same position as the
     * bit at the given index. An error is thrown if the index is out of bounds.
     * @param index the index
     * @return a tuple of [index within _this_.buffer, right shift amount]
     */
    private position(index: number): [number, number] {
        if (index < 0 || index >= this.size) {
            throw Error();
        }

        let bufferIndex: number = index >> 5;
        let leftShiftAmount: number = 31 - (index % 32);

        return [bufferIndex, leftShiftAmount];
    }

}
