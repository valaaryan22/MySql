// 8. Filter Out Odd Numbers and Sort Descending
// Question: Write a function to filter out odd numbers from an array and sort the remaining numbers in descending order.
//  Input: [5, 3, 8, 6, 1, 9]
//  Expected Output: [8, 6]
function findOdd(input){

    let oddNumber = input.filter(num => num % 2 == 0);//find the odd numbers
    let result = oddNumber.sort((a, b) => b - a); // sort the remaining numbers in descending order
    return result;//return the result
    

}
console.log("output of question 8:",findOdd([5, 3, 8, 6, 1, 9]))