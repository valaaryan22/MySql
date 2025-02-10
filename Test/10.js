// 10. Sum of Only Positive Numbers in an Array
// Question: Write a function to sum all positive numbers in an array.
//  Input: [1, -4, 7, 12]
//  Expected Output: 20
function sum(input){
    let sum=0//initilize the sum
    for (let i=0;i<input.length;i++){//loop for data
        if (input[i]>0){//check the number is positive 
        sum=sum+input[i]//add in sum
        }
    }
    return sum//return the output
}
console.log("output of question 10:",sum([1, -4, 7, 12]))