const currentOperandDisplay = document.getElementById("currentOperandDisplay");
const previousOperandDisplay = document.getElementById(
  "previousOperandDisplay"
);
const history = document.getElementById("history");
const keys = document.getElementById("keys");
let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let historyIndex = 1;

function gen() {
  previousOperandDisplay.innerText = "";
  currentOperandDisplay.innerText = "";
  const ceButton = document.createElement("button");
  ceButton.className = "clearBufferButtons";
  ceButton.innerText = "CE";
  ceButton.addEventListener("click", () => {
    clearCurrentOperand();
    updateDisplay();
  });
  keys.appendChild(ceButton);
  const cButton = document.createElement("button");
  cButton.className = "clearBufferButtons";
  cButton.innerText = "C";
  cButton.addEventListener("click", () => {
    clearOperands();
    updateDisplay();
  });
  keys.appendChild(cButton);
  const delButton = document.createElement("button");
  delButton.innerText = "←";
  delButton.addEventListener("click", () => {
    deleteLastNumber();
    updateDisplay();
  });
  keys.appendChild(delButton);
  keys.appendChild(document.createElement("br"));
  for (let i = 9; i >= 0; i--) {
    const numButton = document.createElement("button");
    numButton.innerText = i;
    numButton.dataset.number = i;
    numButton.addEventListener("click", () => {
      appendNumber(numButton.innerText);
      updateDisplay();
    });
    if (i != 9 && i % 3 == 0) {
      keys.appendChild(document.createElement("br"));
    }
    keys.appendChild(numButton);
    switch (i) {
      case 7:
        const divButton = document.createElement("button");
        divButton.innerText = "÷";
        divButton.addEventListener("click", () => {
          chooseOperation(divButton.innerText);
          updateDisplay();
        });
        keys.appendChild(divButton);
        break;
      case 4:
        const mulButton = document.createElement("button");
        mulButton.innerText = "×";
        mulButton.addEventListener("click", () => {
          chooseOperation(mulButton.innerText);
          updateDisplay();
        });
        keys.appendChild(mulButton);
        break;
      case 1:
        const subButton = document.createElement("button");
        subButton.innerText = "-";
        subButton.addEventListener("click", () => {
          chooseOperation(subButton.innerText);
          updateDisplay();
        });
        keys.appendChild(subButton);
        break;
    }
  }
  const dotButton = document.createElement("button");
  dotButton.innerText = ".";
  dotButton.addEventListener("click", () => {
    appendNumber(dotButton.innerText);
    updateDisplay();
  });
  keys.appendChild(dotButton);
  const eqButton = document.createElement("button");
  eqButton.innerText = "=";
  eqButton.addEventListener("click", () => {
    compute();
    updateDisplay();
  });
  keys.appendChild(eqButton);
  const addButton = document.createElement("button");
  addButton.innerText = "+";
  addButton.addEventListener("click", () => {
    chooseOperation(addButton.innerText);
    updateDisplay();
  });
  keys.appendChild(addButton);
}

function updateDisplay() {
  previousOperandDisplay.innerText = previousOperand;
  if (operation !== undefined)
    previousOperandDisplay.innerText += " " + operation;
  currentOperandDisplay.innerText = currentOperand;
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  if (currentOperand.length == 10) return;
  if (currentOperand === "error") currentOperand = "";
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(choosedOperation) {
  if (currentOperand === "" && previousOperand !== "")
    operation = choosedOperation;
  if (currentOperand === "" || currentOperand === "error") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = choosedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "÷":
      if (current === 0) {
        computation = "error";
        break;
      }
      computation = previous / current;
      break;
    case "×":
      computation = previous * current;
      break;
    default:
      return;
  }
  if (computation > 9999999999) {
    currentOperand = computation.toExponential(4).toString();
  } else {
    computation = fixNumber(computation);
    currentOperand = computation.toString();
  }
  const calculationInfo = document.createElement("p");
  calculationInfo.className = "calculationInfo";
  calculationInfo.innerText = "#" + historyIndex + "  " + getCurrentDateTime();
  historyIndex++;
  history.appendChild(calculationInfo);
  const calculationResult = document.createElement("p");
  calculationResult.className = "calculationResult";
  calculationResult.innerText =
    previous + " " + operation + " " + current + " = " + currentOperand;
  history.appendChild(calculationResult);
  history.appendChild(document.createElement("hr"));
  previousOperand = "";
  operation = undefined;
}

function deleteLastNumber() {
  if (currentOperand === "" || currentOperand === "error") return;
  currentOperand = currentOperand.slice(0, -1);
}

function clearCurrentOperand() {
  currentOperand = "";
}

function clearOperands() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function getCurrentDateTime() {
  let currentdate = new Date();
  return (
    "(" +
    currentdate.getHours() +
    ":" +
    String(currentdate.getMinutes()).padStart(2, "0") +
    ":" +
    String(currentdate.getSeconds()).padStart(2, "0") +
    ")"
  );
}

function fixNumber(number) {
  let numberOfDigits = Math.trunc(number).toString().length;
  let exponent = 9 - numberOfDigits;
  return Math.round(number * Math.pow(10, exponent)) / Math.pow(10, exponent);
}
