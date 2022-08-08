// change tema da pagina

document.querySelector("#change_theme").addEventListener("click", () => {
    const page = document.querySelector("body");
    page.classList.toggle("theme_dark");
});

// Logica da calculadora

const expression = document.querySelector("#expression");
const result = document.querySelector("#result");

const btNumbers = document.querySelectorAll(".button-number");
const btFunctions = document.querySelectorAll(".button-function");

let listFunctions = ["+", "-", "x", "/", "( )", "%"];
let insideParentheses = false;
let lastOperator = "";

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
    
    if (insideParentheses) {
        valueExpres = valueExpres.substring(0, indexEnd - 1);
        valueExpres += number + ") ";
        expression.value = valueExpres;
    } else {
        expression.value += number;
    }

    lastOperator = "";
}

function concatedFunction(string) {
    let valueExpres = expression.value;
    const indexEnd = valueExpres.length - 1;

    if (insideParentheses) {
        // valueExpres = valueExpres.substring(0, indexEnd - 2);
        valueExpres += " " + string + ") ";
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

function clear() {
    expression.value = "";
    result.textContent = "";
    lastOperator = "";
}

function calc() {
    let valueExpres = expression.value;
    valueExpres = valueExpres.replace(/x/g, "*");
    // const res = eval(valueExpres);
    const res = Function("return " + valueExpres)();
    result.textContent = res;
}