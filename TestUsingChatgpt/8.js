function filterAndSortEvenNumbers(arr) {
    if (!Array.isArray(arr) || arr.some(isNaN)) {
        return "Invalid input. Please provide an array of numbers.";
    }

    return arr
        .filter(num => num % 2 === 0) // Keep even numbers only
        .sort((a, b) => b - a); // Sort in descending order
}

// Example usage
console.log("Output:", filterAndSortEvenNumbers([5, 3, 8, 6, 1, 9])); // Expected Output: [8, 6]
console.log("Output:", filterAndSortEvenNumbers([2, 4, 6, 8])); // Expected Output: [8, 6, 4, 2]
console.log("Output:", filterAndSortEvenNumbers([])); // Expected Output: []
console.log("Output:", filterAndSortEvenNumbers(["a", 3, 6])); // Expected Output: Invalid input.
