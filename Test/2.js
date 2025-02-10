// 2. Sum of Digits Until Single Digit
// Question: Write a function that repeatedly sums the digi	ts of a number until the result is a single digit.
//  Input: 9875
//  Expected Output: 2
// Explanation : 9+8+7+5 => 29 => 2+9 => 11 => 1+1 => 2
var inputOfTwo = 9875//take user data 
var number = inputOfTwo.toString()//make number to sring to find length
while (number.length > 1) {//check the legth is greater then 1 becuse the legth 1 will be over anser
    var sum = 0//initilize the sum
    for (let i = 0; i < number.length; i++) {//loop the number
        sum = sum + parseInt(number[i])//add all the number in single 
    }
    number = sum.toString()//change the number from the sum
}
console.log("output of question 2:",sum)//show the output