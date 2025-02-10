function sumOfDigitsUntilSingleDigit(num) {
    if (typeof num !== "number" || num < 0) {
        return "Invalid input. Please provide a non-negative number.";
    }

    while (num >= 10) {
        num = [...num.toString()].reduce((sum, digit) => sum + Number(digit), 0);
    }

    return num;
}

// Example usage
const inputNumber = 9875;
console.log("Output:", sumOfDigitsUntilSingleDigit(inputNumber));
