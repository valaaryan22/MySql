// 12. Convert an Array of Numbers to Binary Strings
// Question: Write a function to convert an array of numbers into binary strings.
//  Input: [2, 5, 8]
//  Expected Output: ["10", "101", "1000"]
function integerToBinary(input){
   let result=[]
    for(let i=0;i<input.length;i++){//loop for arry
     result.push(input[i].toString(2));//to string method have cover interger to any string

   }
   return result
    
}
console.log("output of question 12",integerToBinary([2, 5, 8,12]))