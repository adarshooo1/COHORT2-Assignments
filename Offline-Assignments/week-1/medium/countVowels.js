/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Created a string that contains all vowels;
  const vowels = "aeiou";

  // Converted all to lower case;
  const lowerStr = str.toLowerCase();

  // Array.from() and then used the filter method to keep only the vowels.
  return Array.from(lowerStr).filter((char) => vowels.includes(char)).length;
}
module.exports = countVowels;
