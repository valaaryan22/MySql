// 11. Find the Longest Word in a Sentence
// Question: Write a function to find the longest word in a sentence. If there are multiple words of the same length, return the first one.
//  Input: "The quick brown fox jumps over the lazy dog"
//  Expected Output: "jumps"
function findLongestWord(input){
    let words = input.split(' ');//spite the data
    let longestWord = words[0];//assume the fisrt element is longest
    for (let i = 1; i < words.length; i++) {//loop for data
        if (words[i].length > longestWord.length) {//check the current word is longest or not 
            longestWord = words[i];//if yes then set as longest
            }
            }
            return longestWord;//resturn longest word
    
}
console.log("output of question 11:",findLongestWord("The quick brown fox jumps over the lazy dog"))