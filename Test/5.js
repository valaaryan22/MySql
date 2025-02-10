// 5. Flatten a Nested Array
// Question: Write a function to flatten a nested array.
//  Input: [1, [2, 3], [4, [5, 6]]]
//  Expected Output: [1, 2, 3, 4, 5, 6]
function flatten(arr) {//make function for flatten the array
    const result = []//make  empty array  for result 
    for (let i = 0; i < arr.length; i++) {//make for loop for array data 
        if (Array.isArray(arr[i])) {//check the i is nested array or not 
            result.push(...flatten(arr[i]))//if yes then destructer that
        } else {//if not the push that data 
            result.push(arr[i])
        }
    }
    return result//return output
}


console.log("output of question 5:",flatten([1, [2, 3], [4, [5, 6]]]));//show that output