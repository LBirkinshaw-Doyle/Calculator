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
    let holdingArray;

    calculationArray = calculationString.split(" ").map((item) => Number(item)? Number(item) : item);
    console.log(calculationString, calculationArray);
    holdingArray = removeBlankSpaces(calculationArray); // remove blanks spaces caused by two operators next to each other
    
    
    let answer = calculate(holdingArray); //find the result
    console.log(answer);

    // add answer to display here.
    
}

function calculate (inputArray) {
    let holdingArray = inputArray;

    holdingArray = evaluateBrackets(holdingArray); //send to a recursive function that evaluates bracketed expressions
    holdingArray = resolveNegatives(holdingArray); // handle negatives so that all numbers are either positive or negative with addition as necessary
    holdingArray = divide(holdingArray); // send to a function that turns division problems to multiplication
    holdingArray = multiply(holdingArray); // multiply
    holdingArray = add(holdingArray); // add
    return holdingArray;
}

function removeBlankSpaces (inputArray) {
    let filteredArray = holdingArray.filter(Boolean);
    console.log("removal of blank spaces: ", filteredArray)
    return filteredArray;
}

function resolveNegatives (inputArray) {
    let holdingArray = inputArray;
    let index;
    let nextSymbol;
    const subtractFind = (e) => e === "-";

    while (holdingArray.findIndex(subtractFind) >= 0) {
        index = holdingArray.findIndex(subtractFind);
        nextSymbol = holdingArray[index+1];
        if (!isNAN(nextSymbol)) {holdingArray.splice(index, 2, "+", -nextSymbol);}
        else if (nextSymbol === "*" || nextSymbol === "/") {return ["INPUT ERROR"];}
        else if (nextSymbol === "+") {holdingArray.splice(index, 2, "-");}
        else if (nextSymbol === "-") {holdingArray.splice(index, 2, "+");}
        else {
            console.log("something strange happened in resolveNegatives: ", index, nextSymbol, holdingArray);
            return ["UNEXPECTED ERROR"];
        }
    }
    return holdingArray;
}

function divide (inputArray) {
    let holdingArray = inputArray;
    let index;
    let nextSymbol;
    let previousSymbol;
    const divideFind = (e) => e === "/";

    while (holdingArray.findIndex(divideFind) >= 0) {
        index = holdingArray.findIndex(divideFind);
        if (index == 0 || index == holdingArray.length - 1) return ["INPUT ERROR"];

        nextSymbol = holdingArray[index+1];
        previousSymbol = holdingArray[index-1];

        if (!isNaN(nextSymbol) && !isNaN(previousSymbol)) {
            holdingArray.splice(index-1, 3, previousSymbol / nextSymbol)
        }
        else if (nextSymbol === "*" 
            || nextSymbol === "/"
            || nextSymbol === "+"
            || nextSymbol === "-"
            || previousSymbol === "*"
            || previousSymbol === "+"
            || previousSymbol === "-"
            ) {
            return ["INPUT ERROR"];
        }
        else {
            console.log("something strange happened in divide: ", index, previousSymbol, nextSymbol, holdingArray);
            return ["UNEXPECTED ERROR"];
        } 
    }
    return holdingArray;
}

function multiply (inputArray) {
    let holdingArray = inputArray;
    let index;
    let nextSymbol;
    let previousSymbol;
    const multiplyFind = (e) => e === "*";

    while (holdingArray.findIndex(multiplyFind) >= 0) {
        index = holdingArray.findIndex(multiplyFind);
        if (index == 0 || index == holdingArray.length - 1) return ["INPUT ERROR"];

        nextSymbol = holdingArray[index+1];
        previousSymbol = holdingArray[index-1];

        if (!isNaN(nextSymbol) && !isNaN(previousSymbol)) {
            holdingArray.splice(index-1, 3, previousSymbol * nextSymbol)
        }
        else if (nextSymbol === "*" 
            || nextSymbol === "/"
            || nextSymbol === "+"
            || nextSymbol === "-"
            || previousSymbol === "/"
            || previousSymbol === "+"
            || previousSymbol === "-"
            ) {
            return ["INPUT ERROR"];
        }
        else {
            console.log("something strange happened in divide: ", index, previousSymbol, nextSymbol, holdingArray);
            return ["UNEXPECTED ERROR"];
        } 
    }
    return holdingArray;
}
/*
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
*/