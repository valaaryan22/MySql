function capitalizeWords(sentence) {
    if (typeof sentence !== "string" || sentence.trim() === "") {
        return "Invalid input. Please provide a non-empty string.";
    }

    return sentence
        .split(" ") // Split words by space
        .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : "") // Capitalize first letter
        .join(" "); // Join words back to sentence
}

// Example usage
console.log("Output:", capitalizeWords("hello world from javascript"));
