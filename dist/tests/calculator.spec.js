"use strict";
var calculator_1 = require("../src/calculator");
var chai_1 = require("chai");
describe("Calculator", function () {
    it("getSum", function () {
        chai_1.expect(calculator_1.Calculator.getSum([1, 2, 3, 4])).to.eql(10);
        chai_1.expect(calculator_1.Calculator.getSum([1, 2, 3])).to.eql(6);
        chai_1.expect(calculator_1.Calculator.getSum([0, 1, 2, 3])).to.eql(6);
    });
    describe("possibilities", function () {
        it("numbers", function () {
            function getNumbers(combination) {
                return combination.numbers;
            }
            chai_1.expect(calculator_1.Calculator.getPossibilities(3, 2).map(getNumbers)).to.eql([[1, 2]]);
            chai_1.expect(calculator_1.Calculator.getPossibilities(6, 2).map(getNumbers)).to.eql([[1, 5], [2, 4]]);
            chai_1.expect(calculator_1.Calculator.getPossibilities(12, 4).map(getNumbers)).to.eql([[1, 2, 3, 6], [1, 2, 4, 5]]);
            chai_1.expect(calculator_1.Calculator.getPossibilities(45, 9).map(getNumbers)).to.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });
        it("sum", function () {
            chai_1.expect(calculator_1.Calculator.getPossibilities(3, 2)[0].sum).to.eql(3);
            chai_1.expect(calculator_1.Calculator.getPossibilities(6, 2)[0].sum).to.eql(6);
            chai_1.expect(calculator_1.Calculator.getPossibilities(12, 4)[0].sum).to.eql(12);
            chai_1.expect(calculator_1.Calculator.getPossibilities(45, 9)[0].sum).to.eql(45);
        });
        it("count", function () {
            chai_1.expect(calculator_1.Calculator.getPossibilities(3, 2)[0].count).to.eql(2);
            chai_1.expect(calculator_1.Calculator.getPossibilities(6, 2)[0].count).to.eql(2);
            chai_1.expect(calculator_1.Calculator.getPossibilities(12, 4)[0].count).to.eql(4);
            chai_1.expect(calculator_1.Calculator.getPossibilities(45, 9)[0].count).to.eql(9);
        });
    });
});
//# sourceMappingURL=calculator.spec.js.map