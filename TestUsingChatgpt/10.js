const sumPositiveNumbers = (arr) => arr.reduce((sum, num) => num > 0 ? sum + num : sum, 0);

console.log("Output of question 10:", sumPositiveNumbers([1, -4, 7, 12]));
    