function flattenArray(arr) {
    if (!Array.isArray(arr)) {
        return "Invalid input. Please provide an array.";
    }

    return arr.reduce((acc, val) => 
        acc.concat(Array.isArray(val) ? flattenArray(val) : val), []
    );
}

// Example usage
console.log("Output:", flattenArray([1, [2, 3], [4, [5, 6]]]));
