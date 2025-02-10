// 9. Replace All Vowels in a String with a Specific Character
// Question: Write a function to replace all vowels in a string with a specified character.
//  Input: ("hello world", "*")
//  Expected Output: "h*ll* w*rld"
function replaceCharater(data, replaceData) {

    let result = "";
    for (let i = 0; i < data.length; i++) {//loop for data 
        if ("aeiouAEIOU".includes(data[i])) {//check the perticulr word is comming in the data
            result += replaceData;//change that part
        } else {
            result += data[i];//else add remeing data
        }
    }
    return result;//return the data

}
console.log("output of question 9:",replaceCharater("hello world","*"))