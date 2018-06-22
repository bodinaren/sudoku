import { Combination } from "./combination";

/**
 * The calculator is used to calculate all possible combinations in a Killer Sudoku group.
 * @see Combination
 */
export class Calculator {

  /** Get the sum of all the numbers in the array */
  static getSum(numbers: number[]): number {
    return numbers.reduce((t, n) => t + n);
  }

  /**
   * Get all the possibilities for a certain number using the provided amount of digits.
   * @param target {number} The target value.
   * @param digits {number} How many digits should be used.
   */
  static getPossibilities(target: number, digits: number): Combination[] {
    return this._sumUp(9, target, digits);
  }

  /**
   * Recursive function to find all the possible combinations.
   * @param num {number} The starting (max) number.
   * @param target {number} The target we're aiming for.
   * @param digits {number} How many digits we can use to find the target.
   */
  private static _sumUp(num: number, target: number, digits: number): Combination[] {

    let possibilities = [];

    do {
      if (num > target) { // too high, let's try a lower number
        continue;

      } else if (num === target) { // found target
        if (digits !== 1) continue; // but with too few numbers, let's try a lower number
        else possibilities.push(new Combination([num])); // SUCCESS! found target in right amount of digits, let's traverse back up

      } else { // too low
        if (digits > 1) { // we still have room for more digits
          let rs = this._sumUp(num - 1, target - num, digits - 1); // let's try with next digit

          // traversed back up

          rs.forEach((x) => { // add all possible combinations of digits to accompany the current one, then try next number
            x.numbers.push(num);
            possibilities.push(x);
          });
        } else break;
      }
    } while (--num > 0);

    possibilities.sort();
    return possibilities;
  }
}
