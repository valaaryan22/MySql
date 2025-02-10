const findLongestWord = (sentence) => 
    sentence.split(" ").reduce((longest, word) => word.length > longest.length ? word : longest, "");

console.log("Output of question 11:", findLongestWord("The quick brown fox jumps over the lazy dog"));
