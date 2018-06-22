"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A combination is a set of numbers which adds up to a specific sum which is used to present a possible combination in a Killer Sudoku group.
 */
var Combination = /** @class */ (function () {
    function Combination(numbers) {
        this.numbers = numbers;
    }
    Object.defineProperty(Combination.prototype, "sum", {
        /** The total sum of the combination */
        get: function () {
            return this.numbers.reduce(function (t, n) { return t + n; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combination.prototype, "count", {
        /** The amount of numbers in the combination (short for `numbers.length`) */
        get: function () {
            return this.numbers.length;
        },
        enumerable: true,
        configurable: true
    });
    return Combination;
}());
exports.Combination = Combination;
//# sourceMappingURL=combination.js.map