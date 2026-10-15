let num1 = "";
let num2 = "";
let operator = "";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function add(value) {

    buttons.forEach(button => button.classList.remove("active"));

    event.target.classList.add("active");

    if (value === "+" || value === "-" || value === "*" || value === "/") {
        num1 = display.value;
        operator = value;
        display.value = "";
    } else {
        display.value += value;
    }
}

function calculate() {

    buttons.forEach(button => button.classList.remove("active"));
    event.target.classList.add("active");

    if (num1 === "" || operator === "" || display.value === "") {
        return;
    }

    num2 = display.value;

    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === "+") {
        display.value = num1 + num2;
    } 
    else if (operator === "-") {
        display.value = num1 - num2;
    } 
    else if (operator === "*") {
        display.value = num1 * num2;
    } 
    else if (operator === "/") {
        display.value = num2 === 0 ? "Error" : num1 / num2;
    }

    num1 = "";
    num2 = "";
    operator = "";
}

function clearDisplay() {

    buttons.forEach(button => button.classList.remove("active"));

    display.value = "";
    num1 = "";
    num2 = "";
    operator = "";
}