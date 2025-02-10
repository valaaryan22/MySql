// 3. Remove Duplicates from an Array Without Using Set
// Question: Write a function to remove duplicate elements from an array without using Set.
// Input: [1, 2, 3, 4, 4, 5, 5, 6]
// Expected Output: [1, 2, 3, 4, 5, 6]

const Input = [5, 1, 2, 3, 4, 4, 5, 5, 6]//input data
function removeDuplicates(arr) {   //make method for removeDuplicate
    let result = [];    //initilize the empty array 
    for (let i = 0; i < arr.length; i++) {//for loop for array data
        let duplicate = false;  //initilize the flag
        for (let j = 0; j < result.length; j++) {  //for loop for result data to check 
            if (arr[i] === result[j]) {  //if array data is equal to result
                duplicate = true;  //set flag to true
                break;  //exit the loop
            }
        }
        if (!duplicate) {  //if flag is false
            result.push(arr[i]);  //push the data to result array
        }
    }
    return result;  //return the result array

}
console.log("output of question 3:",removeDuplicates(Input));


