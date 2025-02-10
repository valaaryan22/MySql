// 1. Reverse Each Word in a Sentence
// Question: Write a function that reverses each word in a given sentence.
//  Input: "Hello World from JavaScript"
//  Expected Output: "olleH dlroW morf tpircSavaJ"
let inputOfOne = "Hello World from JavaScript"//Take the input we can use input for thake input from user
let words = inputOfOne.split(" ")//splite the words using space 
let reversedWords = words.map(word => word.split("").reverse().join(""))//take one word make him array type and reverse that using revers method and join the splite data 
let Output = reversedWords.join(" ")//join the splited data
console.log("output of question 1:",Output)//console the output


