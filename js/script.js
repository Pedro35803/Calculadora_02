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

let list = [];

btNumbers.forEach(btNumber => btNumber.addEventListener("click", () => {
        const buttonContent = btNumber.textContent;
        concatedNumber(buttonContent);
    }
));

btFunctions.forEach(btFunction => btFunction.addEventListener("click", () => {
        const buttonContent = btFunction.textContent;
        concatedFunction(buttonContent);
    }
));

function concatedNumber(number) {
    expression.value += number;
    const sizeList = list.length - 1;
    list[sizeList] += number;
}

function concatedFunction(string) {
    const sizeList = list.length - 1;
    if (list[sizeList] != "" && Number(list[sizeList]) != NaN) {
        expression.value += " " + string + " ";
        list.push(string);
        list.push("");
    }
}