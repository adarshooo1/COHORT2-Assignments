/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const clearStr = str
    .replace(/[\s~`!@#$%^&*()_+={[}\]:;<>,.?\\/-]/g, "")
    .toLowerCase();

  if (clearStr.length === 0 || clearStr.length === 1) {
    return true;
  }

  let start = 0;
  let end = clearStr.length - 1;
  while (start <= end) {
    if (clearStr[start] != clearStr[end]) {
      return false;
    } else {
      start++;
      end--;
    }
    // If the loop completes without returning false, it's a palindrome
    return true;
  }
}

module.exports = isPalindrome;
