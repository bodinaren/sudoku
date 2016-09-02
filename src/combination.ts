import {Linq} from "btypescript";

/**
 * A combination is a set of numbers which adds up to a specific sum which is used to present a possible combination in a Killer Sudoku group.
 */
export class Combination {

    /** The numbers in the combination. */
    numbers: number[];

    /** If this combination is marked as invalid */
    isStriked: boolean;

    constructor(numbers: number[]) {
        this.numbers = numbers;
    }

    /** The total sum of the combination */
    get sum(): number {
        return Linq.sum(this.numbers);
    }
    /** The amount of numbers in the combination (short for `numbers.length`) */
    get count(): number {
        return this.numbers.length;
    }
}
