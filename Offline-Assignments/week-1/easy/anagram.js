/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let lowerStr1 = str1.toLowerCase();
  let lowerStr2 = str2.toLowerCase();

  let sortedStr1 = lowerStr1.split("").sort().join("");
  let sortedStr2 = lowerStr2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
}

module.exports = isAnagram;
