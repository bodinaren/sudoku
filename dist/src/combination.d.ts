/**
 * A combination is a set of numbers which adds up to a specific sum which is used to present a possible combination in a Killer Sudoku group.
 */
export declare class Combination {
    /** The numbers in the combination. */
    numbers: number[];
    /** If this combination is marked as invalid */
    isStriked: boolean;
    constructor(numbers: number[]);
    /** The total sum of the combination */
    sum: number;
    /** The amount of numbers in the combination (short for `numbers.length`) */
    count: number;
}
