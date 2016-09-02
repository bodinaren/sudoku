import { Combination } from "./combination";
/**
 * The calculator is used to calculate all possible combinations in a Killer Sudoku group.
 * @see Combination
 */
export declare class Calculator {
    /** Get the sum of all the numbers in the array */
    static getSum(numbers: number[]): number;
    /**
     * Get all the possibilities for a certain number using the provided amount of digits.
     * @param target {number} The target value.
     * @param digits {number} How many digits should be used.
     */
    static getPossibilities(target: number, digits: number): Combination[];
    /**
     * Recursive function to find all the possible combinations.
     * @param num {number} The starting (max) number.
     * @param target {number} The target we're aiming for.
     * @param digits {number} How many digits we can use to find the target.
     */
    private static _sumUp(num, target, digits);
}
