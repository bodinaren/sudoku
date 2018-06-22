import { Calculator } from "../src/calculator";

describe("Calculator", () => {

  it("only static function", () => {
    let calc = new Calculator();
    
    expect(calc["getSum"]).toBeUndefined;
    expect(calc["getPossibilities"]).toBeUndefined;
  });

  it("getSum", () => {
    expect(Calculator.getSum([1, 2, 3, 4])).toBe(10);
    expect(Calculator.getSum([1, 2, 3])).toBe(6);
    expect(Calculator.getSum([0, 1, 2, 3])).toBe(6);
  });

  describe("possibilities", () => {
    it("numbers", () => {
      function getNumbers(combination) {
        return combination.numbers;
      }

      expect(Calculator.getPossibilities(3, 2).map(getNumbers)).toEqual([[1, 2]]);
      expect(Calculator.getPossibilities(6, 2).map(getNumbers)).toEqual([[1, 5], [2, 4]]);
      expect(Calculator.getPossibilities(12, 4).map(getNumbers)).toEqual([[1, 2, 3, 6], [1, 2, 4, 5]]);
      expect(Calculator.getPossibilities(45, 9).map(getNumbers)).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
    });

    it("sum", () => {
      expect(Calculator.getPossibilities(3, 2)[0].sum).toBe(3);
      expect(Calculator.getPossibilities(6, 2)[0].sum).toBe(6);
      expect(Calculator.getPossibilities(12, 4)[0].sum).toBe(12);
      expect(Calculator.getPossibilities(45, 9)[0].sum).toBe(45);
    });

    it("count", () => {
      expect(Calculator.getPossibilities(3, 2)[0].count).toBe(2);
      expect(Calculator.getPossibilities(6, 2)[0].count).toBe(2);
      expect(Calculator.getPossibilities(12, 4)[0].count).toBe(4);
      expect(Calculator.getPossibilities(45, 9)[0].count).toBe(9);
    });
  });
  
});