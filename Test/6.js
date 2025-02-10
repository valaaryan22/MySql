// 6. Capitalize the First Letter of Each Word in a Sentence
// Question: Write a function to capitalize the first letter of each word in a sentence.
//  Input: "hello world from javascript"
//  Expected Output: "Hello World From Javascript"
function capitalize(input) {
    let data = input.split(' ');//splite the data 
    let result = data.map(word => word.charAt(0).toUpperCase() + word.slice(1));//make first word capital and rest of other same
    return result.join(' ');//make word to sentence using jooin

}

console.log("output of question 6:",capitalize("hello world from javascript"))