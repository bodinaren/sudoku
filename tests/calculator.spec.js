/// <reference path="../typings/main.d.ts" />

import {Calculator} from "../src/calculator";
import {expect} from 'chai';

let _ = 0;

describe("Calculator", function() {
    it("getSum", function() {
        expect(Calculator.getSum([1, 2, 3, 4])).to.eql(10);
        expect(Calculator.getSum([1, 2, 3])).to.eql(6);
        expect(Calculator.getSum([0, 1, 2, 3])).to.eql(6);
    });

    it("getPossibilities", function() {
        expect(Calculator.getPossibilities(3, 2)).to.eql([[1, 2]]);
        expect(Calculator.getPossibilities(6, 2)).to.eql([[1, 5], [2, 4]]);
        expect(Calculator.getPossibilities(12, 4)).to.eql([[1, 2, 3, 6], [1, 2, 4, 5]]);
        expect(Calculator.getPossibilities(45, 9)).to.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
    });
});