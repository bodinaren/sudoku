"use strict";
var btypescript_1 = require("btypescript");
var combination_1 = require("./combination");
/**
 * The calculator is used to calculate all possible combinations in a Killer Sudoku group.
 * @see Combination
 */
var Calculator = (function () {
    function Calculator() {
    }
    /** Get the sum of all the numbers in the array */
    Calculator.getSum = function (numbers) {
        return btypescript_1.Linq.sum(numbers);
    };
    /**
     * Get all the possibilities for a certain number using the provided amount of digits.
     * @param target {number} The target value.
     * @param digits {number} How many digits should be used.
     */
    Calculator.getPossibilities = function (target, digits) {
        return this._sumUp(9, target, digits);
    };
    /**
     * Recursive function to find all the possible combinations.
     * @param num {number} The starting (max) number.
     * @param target {number} The target we're aiming for.
     * @param digits {number} How many digits we can use to find the target.
     */
    Calculator._sumUp = function (num, target, digits) {
        var possibilities = [];
        do {
            if (num > target) {
                continue;
            }
            else if (num === target) {
                if (digits !== 1)
                    continue; // but with too few numbers, let's try a lower number
                else
                    possibilities.push(new combination_1.Combination([num])); // SUCCESS! found target in right amount of digits, let's traverse back up
            }
            else {
                if (digits > 1) {
                    var rs = this._sumUp(num - 1, target - num, digits - 1); // let's try with next digit
                    // traversed back up
                    rs.forEach(function (x) {
                        x.numbers.push(num);
                        possibilities.push(x);
                    });
                }
                else
                    break;
            }
        } while (--num > 0);
        possibilities.sort();
        return possibilities;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
//# sourceMappingURL=calculator.js.map