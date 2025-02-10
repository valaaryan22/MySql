function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        return "Invalid input. Please provide an array.";
    }

    let seen = {};  // Object to track unique values
    let result = [];

    for (let num of arr) {
        if (!seen[num]) {
            seen[num] = true;  // Mark number as seen
            result.push(num);   // Add unique numbers to result
        }
    }

    return result;
}

// Example usage
const inputArray = [5, 1, 2, 3, 4, 4, 5, 5, 6];
console.log("Output:", removeDuplicates(inputArray));
