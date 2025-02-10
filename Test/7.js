// 7. Square Every Digit of a Number
// Question: Write a function to square each digit of a number and concatenate them.
//  Input: 9119
//  Expected Output: 811181
function square(input){
    let result=""//make empty result
    let data=input.toString()//make data to string
    for(let i=0;i<data.length;i++){//loop for single eliment
        let square=parseInt(data[i])*parseInt(data[i])//make squre of data
        result+=square.toString()//add in result 
    }
    return result//reutrn the result 
}
console.log("output of question 7:",square(8118))//show the result  