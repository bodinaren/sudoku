import {Calculator} from "../src/calculator";
import {expect} from 'chai';

describe("Calculator", function() {
    it("getSum", function() {
        expect(Calculator.getSum([1, 2, 3, 4])).to.eql(10);
        expect(Calculator.getSum([1, 2, 3])).to.eql(6);
        expect(Calculator.getSum([0, 1, 2, 3])).to.eql(6);
    });

    describe("possibilities", function () {
        it("numbers", function() {
            function getNumbers(combination) {
                return combination.numbers;
            }

            expect(Calculator.getPossibilities(3, 2).map(getNumbers)).to.eql([[1, 2]]);
            expect(Calculator.getPossibilities(6, 2).map(getNumbers)).to.eql([[1, 5], [2, 4]]);
            expect(Calculator.getPossibilities(12, 4).map(getNumbers)).to.eql([[1, 2, 3, 6], [1, 2, 4, 5]]);
            expect(Calculator.getPossibilities(45, 9).map(getNumbers)).to.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });

        it("sum", function () {
            expect(Calculator.getPossibilities(3, 2)[0].sum).to.eql(3);
            expect(Calculator.getPossibilities(6, 2)[0].sum).to.eql(6);
            expect(Calculator.getPossibilities(12, 4)[0].sum).to.eql(12);
            expect(Calculator.getPossibilities(45, 9)[0].sum).to.eql(45);
        });

        it("count", function () {
            expect(Calculator.getPossibilities(3, 2)[0].count).to.eql(2);
            expect(Calculator.getPossibilities(6, 2)[0].count).to.eql(2);
            expect(Calculator.getPossibilities(12, 4)[0].count).to.eql(4);
            expect(Calculator.getPossibilities(45, 9)[0].count).to.eql(9);
        });
    });
    
});