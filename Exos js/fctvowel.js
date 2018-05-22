function countVowels(string) {
  var vowels = string.match(/[aeiou]/gi);
  alert(vowels.length);
}

countVowels("helloooo");

