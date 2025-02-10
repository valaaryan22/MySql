// 4. Find the First Non-Repeating Character in a String
// Question: Write a function that returns the first non-repeating character in a string.
//  Input: "swiss"
//  Expected Output: "w"
function nonRepeating(data) {
    let input = data//data
    for (let i = 0; i < input.length; i++) {//loop for data 
        let count=0//initialize count
        for (let j = 0; j < input.length; j++) {//inside loop for data 
            
            if(input[i]==input[j]){//count the chacter occurence 
            count=count+1
            }
    }
    if(count==1){//if occurence is 1 return that 
        return input[i]

    }
    }
}
console.log("output of question 4:",nonRepeating("swiss"))//show output