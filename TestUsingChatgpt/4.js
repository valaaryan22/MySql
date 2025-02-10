function firstNonRepeatingCharacter(str) {
    if (typeof str !== "string" || str.trim() === "") {
        return "Invalid input. Please provide a non-empty string.";
    }

    let charCount = {}; // Object to store character frequencies

    // First pass: Count occurrences of each character
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Second pass: Find the first character with count = 1
    for (let char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    return "No non-repeating character found.";
}

// Example usage
console.log("Output:", firstNonRepeatingCharacter("swiss"));
    