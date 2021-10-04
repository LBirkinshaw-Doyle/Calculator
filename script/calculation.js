let displayString = "";
let calculationString = "";
let numberButtonArray = [];
let operatorButtonArray = [];

numberButtonArray = document.querySelectorAll(".number");
operatorButtonArray = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const result = document.querySelector('#result');
const equalButton = document.querySelector(".equality");

numberButtonArray.forEach((element) => element.addEventListener("click", parseInput));
operatorButtonArray.forEach((element) => element.addEventListener("click", parseInput));

equalButton.addEventListener("click", evaluate);


function parseInput (click) {
    let button = click.target;
    let input
    button.firstChild? input = String(button.firstChild.textContent) : input = String(button.textContent);
    
    displayString += input; 
    
    switch (input) {
        case operatorButtonArray[0].firstChild.textContent:
            calculationString += " ( ";
        break;
        case operatorButtonArray[1].firstChild.textContent:
            calculationString += " ) ";
        break;
        case operatorButtonArray[2].firstChild.textContent:
            calculationString += " * ";
        break;
        case operatorButtonArray[3].firstChild.textContent:
            calculationString += " / ";
        break;
        case operatorButtonArray[4].firstChild.textContent:
            calculationString += " - ";
        break;
        case operatorButtonArray[5].firstChild.textContent:
            calculationString += " + ";
        break;
        default:
            calculationString += input;
        break;
    }

    display.textContent = displayString;
    display.classList.remove("blink");
}

function evaluate () {
    let calculationArray;

    calculationArray = calculationString.split(" ").map((item) => Number(item)? Number(item) : item);
    console.log(calculationString, calculationArray);
    
    let answer = calculate(calculationArray);
    
}

function calculate (inputArray) {
    const openBracketFind = (e) => e === "(";
    const closeBracketFind = (e) => e === ")";
    let openBracketPresent = inputArray.findIndex(openBracketFind) >= 0
    let closeBracketPresent = inputArray.findIndex(closeBracketFind) >= 0
    let holdingArray = inputArray;
    let reversedArray = inputArray.slice().reverse(); 

    if (openBracketPresent && closeBracketPresent) {
        let openIndex = holdingArray.findIndex(openBracketFind);
        let closeIndex = holdingArray.length - 1 - reversedArray.findIndex(closeBracketFind);
        let spliceLength = closeIndex - openIndex + 1;
        let sliceArray = holdingArray.slice(openIndex+1, closeIndex);
        let bracketReturn = calculate(sliceArray);
        console.log(bracketReturn);
        holdingArray.splice(openIndex, spliceLength, ...bracketReturn);
    }
    else if (!(openBracketPresent && closeBracketPresent) && (openBracketPresent || closeBracketPresent)) {
        return ["INPUT ERROR"]
    }
    holdingArray = convertNegatives(holdingArray);
    holdingArray = divide(holdingArray);
    holdingArray = multiply(holdingArray);
    holdingArray = add(holdingArray);
    return holdingArray;
}

function divide (calculationArray) {
    console.log(calculationArray)
    let holdingArray = calculationArray;
    let index;
    const divideFind = (e) => e === "/";
    while (holdingArray.findIndex(divideFind) >= 0) {
        index = holdingArray.findIndex(divideFind);
        if (holdingArray[index-1] === ""||holdingArray[index+1] === "") {return ["INPUT ERROR"]}
        holdingArray.splice(index, 2, "*", 1 / holdingArray[index+1]);
    }
    return holdingArray;
}
function multiply (calculationArray) {
    let holdingArray = calculationArray;
    let index;
    const multiplyFind = (e) => e === "*";
    while (holdingArray.findIndex(multiplyFind) >= 0) {
        index = holdingArray.findIndex(multiplyFind);
        if (holdingArray[index-1] === ""||holdingArray[index+1] === "") {return ["INPUT ERROR"]}
        holdingArray.splice(index-1, 3, holdingArray[index-1] * holdingArray[index+1]);
    }
    return holdingArray;
}
function add (calculationArray) {
    let holdingArray = calculationArray;
    let index;
    const addFind = (e) => e === "+";
    while (holdingArray.findIndex(addFind) >= 0) {
        index = holdingArray.findIndex(addFind);
        holdingArray.splice(index-1, 3, holdingArray[index-1] + holdingArray[index+1]);
    }
    return holdingArray;
}
function convertNegatives (calculationArray) {
    let holdingArray = calculationArray;
    let index;
    const subtractFind = (e) => e === "-";

    let filteredArray = holdingArray.filter(Boolean);
    console.log(filteredArray);
    while (filteredArray.findIndex(subtractFind) >= 0) {
        index = filteredArray.findIndex(subtractFind);
        if (filteredArray[index-1] === "") {filteredArray.splice(index, 2, -filteredArray[index+1]);}
        else if (filteredArray[index+1] === "") {return ["INPUT ERROR"]}
        else {filteredArray.splice(index, 2, "+", -filteredArray[index+1]);}
    }
    return filteredArray;
}