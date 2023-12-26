/*
  Implement a class `Calculator` having below methods
    - initialize a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  // constructor function
  constructor() {
    this.result = 0;
  }

  // Method of adding number;
  add(number) {
    // if (typeof number !== number) {
    //   throw new Error("Invalid Type Input, Please write a valid number");
    // }
    this.result += number;
  }

  subtract(number) {
    // if (typeof number !== number) {
    //   throw new Error("Invalid Type Input, Please write a valid number");
    // }
    this.result -= number;
  }

  multiply(number) {
    // if (typeof number !== number) {
    //   throw new Error("Invalid Type Input, Please write a valid number");
    // }
    this.result *= number;
  }
  divide(number) {
    if (typeof number !== "number") {
      throw new Error("Invalid Type Input, Please write a valid number");
    }
    // It's also a good practice to check for division by zero
    if (number === 0) {
      throw new Error();
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    // Remove multiple continuous spaces and trim leading and trailing spaces.s
    const cleanedExpression = expression.replace(/\s+/g, " ").trim();

    // If there are non-numerical character in the Expression.
    if (!/^[0-9\s+\-*/().]+$/.test(cleanedExpression)) {
      throw new Error("Invalid characters in the expression");
    }

    try {
      this.result = eval(cleanedExpression);
      if (!isFinite(this.result)) {
        throw new Error("Division by Zero");
      }
    } catch (error) {
      throw new Error("Invalid expression");
    }
  }
}

module.exports = Calculator;
