function reverseWordsInSentence(sentence) {
    if (typeof sentence !== "string" || sentence.trim() === "") {
        return "Invalid input. Please provide a valid sentence.";
    }

    return sentence
        .split(" ") // Split sentence into words
        .map(word => [...word].reverse().join("")) // Reverse each word
        .join(" "); // Join the words back into a sentence
}

// Example usage
const inputSentence = "Hello World from JavaScript";
console.log("Output:", reverseWordsInSentence(inputSentence));
