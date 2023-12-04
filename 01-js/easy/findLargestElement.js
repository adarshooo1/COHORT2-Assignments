/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(number) {
  if (number.length === 0) {
    return undefined; // or handle empty array case accordingly
  }
  return Math.max(...number);
}

module.exports = findLargestElement;
