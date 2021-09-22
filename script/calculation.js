let displayString = "";
let calculationString = "";
let numberButtonArray = [];
let operatorButtonArray = [];

numberButtonArray = document.querySelectorAll(".number");
operatorButtonArray = document.querySelectorAll(".operator");
const display = document.querySelector("#display");

numberButtonArray.forEach((element) => element.addEventListener("click", parseInput));
operatorButtonArray.forEach((element) => element.addEventListener("click", parseInput));

function parseInput (click) {
    let button = click.target;
    let input
    button.firstChild? input = String(button.firstChild.textContent) : input = String(button.textContent);
    
    displayString += input; 
    
    switch (input) {
        case operatorButtonArray[0].firstChild.textContent:
            calculationString += " * ";
        break;
        case operatorButtonArray[1].firstChild.textContent:
            calculationString += " / ";
        break;
        case operatorButtonArray[2].firstChild.textContent:
            calculationString += " - ";
        break;
        case operatorButtonArray[3].firstChild.textContent:
            calculationString += " + ";
        break;
        default:
            calculationString += input;
        break;
    }

    display.textContent = displayString;
    display.classList.remove("blink");
    console.log(displayString, calculationString);
}
