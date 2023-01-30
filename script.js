const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false; 

let sendNumValue = (number) => {
  //replace current display value if first value is entered
  if(awaitingNextValue === true) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
      //if current display value is 0 replace it if not add number
      const displayValue = calculatorDisplay.textContent;
      calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
    // if operator pressed don't add decimal
    if(awaitingNextValue) return;
    //if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent ,multiple opertaors
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        
        const calculation = calculate[operatorValue](firstValue, currentValue);
      
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //ready for next value store our operator
    awaitingNextValue = true;
    operatorValue = operator;
}

//Add event listeners for nukmbers, operators, decinal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click',() => sendNumValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click',() => addDecimal());
    }
});

// reset display
function resetAll () {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false; 
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click' ,resetAll);