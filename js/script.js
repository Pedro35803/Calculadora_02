// Logica da calculadora

const expression = document.querySelector("#expression");
const result = document.querySelector("#result");

const btNumbers = document.querySelectorAll(".button-number");
const btFunctions = document.querySelectorAll(".button-function");

let listFunctions = ["+", "-", "x", "/", "%", "( )", `)`];
let insideParentheses = false;
let lastOperator = "";
let numberTemp = "";

btNumbers.forEach(btNumber => btNumber.addEventListener("click", () => {
    const buttonContent = btNumber.textContent;
    concatedNumber(buttonContent);
}));

btFunctions.forEach(btFunction => btFunction.addEventListener("click", () => {
    let buttonContent = btFunction.textContent;
    if (buttonContent == "C") {
        clear();
    } else if (buttonContent == "=") {
        calc();
    } else {
        if (buttonContent == "( )") {
            if (!insideParentheses) {
                if (lastOperator == "" && expression.value != "") {
                    expression.value += " x";
                }
                buttonContent = "(";
            } else {
                buttonContent = "";
            }
            insideParentheses = !insideParentheses;
        }
        concatedFunction(buttonContent);
    }
}));

function concatedNumber(number) {
    let valueExpres = expression.value;
    const indexEnd = valueExpres.length - 1;
    const valuePrev = valueExpres;

    if (insideParentheses) {
        valueExpres = valueExpres.substring(0, indexEnd - 1);
        valueExpres += number + ") ";
        valueExpres = testConcated(valueExpres, valuePrev);
    } else {
        valueExpres += number;
        valueExpres = testConcated(valueExpres, valuePrev);
    }

    expression.value = valueExpres;

    lastOperator = "";
}

function concatedFunction(string) {
    let valueExpres = expression.value;
    const indexEnd = valueExpres.length - 1;

    if (insideParentheses) {
        const possuiParentesesAntes = listFunctions.indexOf(valueExpres[indexEnd]) == -1;

        if (listFunctions.indexOf(lastOperator) == -1 && possuiParentesesAntes) {
            valueExpres = valueExpres.substring(0, indexEnd - 1);
        }
        
        valueExpres += " " + string + " ) ";
        lastOperator = string;
    } else if (string == "-" && lastOperator != "-") {
        valueExpres += string;
        lastOperator = string;
    } else if (lastOperator == "" && indexEnd + 1 != 0) {
        valueExpres += " " + string + " ";
        lastOperator = string;
    } else if (listFunctions.indexOf(lastOperator) != -1) {
        valueExpres = valueExpres.substring(0, indexEnd - 2);
        valueExpres += " " + string + " ";
    }

    expression.value = valueExpres.toLowerCase();
}

function testConcated(valueExpres, valuePrev) {
    const valueCalc = valueExpres.replace(/x/g, "*");
    try {
        Function("return " + valueCalc)();
        return valueExpres;
    } catch {
        return valuePrev;
    }
}

function clear() {
    lastOperator = "";
    expression.value = "";
    result.textContent = "";
    insideParentheses = false;
}

function calc() {
    let valueExpres = expression.value;
    valueExpres = valueExpres.replace(/x/g, "*");

    const res = Function("return " + valueExpres)();
    result.textContent = res;
    insideParentheses = false;
}