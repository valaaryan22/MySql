function squareDigits(num) {
    if (typeof num !== "number" || num < 0) {
        return "Invalid input. Please provide a positive number.";
    }

    return Number(
        num
            .toString() // Convert number to string
            .split("") // Split digits into an array
            .map(digit => digit ** 2) // Square each digit
            .join("") // Concatenate back to a string
    );
}

// Example usage
console.log("Output:", squareDigits(9119)); // Expected Output: 811181
