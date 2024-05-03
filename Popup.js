document.getElementById('clearBtn').addEventListener('click', clearResult);
document.getElementById('plusBtn').addEventListener('click', () => appendToResult('+'));
document.getElementById('minusBtn').addEventListener('click', () => appendToResult('-'));
document.getElementById('multiplyBtn').addEventListener('click', () => appendToResult('*'));
document.getElementById('divideBtn').addEventListener('click', () => appendToResult('/'));
document.getElementById('equalsBtn').addEventListener('click', calculateResult);
document.getElementById('oneBtn').addEventListener('click', () => appendToResult('1'));
document.getElementById('twoBtn').addEventListener('click', () => appendToResult('2'));
document.getElementById('threeBtn').addEventListener('click', () => appendToResult('3'));
document.getElementById('fourBtn').addEventListener('click', () => appendToResult('4'));
document.getElementById('fiveBtn').addEventListener('click', () => appendToResult('5'));
document.getElementById('sixBtn').addEventListener('click', () => appendToResult('6'));
document.getElementById('sevenBtn').addEventListener('click', () => appendToResult('7'));
document.getElementById('eightBtn').addEventListener('click', () => appendToResult('8'));
document.getElementById('nineBtn').addEventListener('click', () => appendToResult('9'));
document.getElementById('zeroBtn').addEventListener('click', () => appendToResult('0'));
document.getElementById('percentageBtn').addEventListener('click', () => appendToResult('%'));
document.getElementById('powerBtn').addEventListener('click', () => appendToResult('^'));

let currentExpression = '';

function appendToResult(value) {
  // Special handling for percentage and exponentiation
  if (value === '%' || value === '^') {
    if (currentExpression !== '') {
      currentExpression += value;
      document.getElementById('result').value = currentExpression;
    }
  } else {
    currentExpression += value;
    document.getElementById('result').value = currentExpression;
  }
}

function calculateResult() {
  try {
    const result = evaluateExpression(currentExpression);
    document.getElementById('result').value = result;
    currentExpression = result.toString();
  } catch (error) {
    document.getElementById('result').value = 'Error';
    currentExpression = '';
  }
}

function clearResult() {
  currentExpression = '';
  document.getElementById('result').value = '';
}

function evaluateExpression(expression) {
  let tokens = expression.match(/(\d+(\.\d+)?)|(\+)|(-)|(\*)|(\/)|(\%)|(\^)/g);
  if (!tokens) {
    throw new Error('Invalid expression');
  }

  let numbers = [];
  let operators = [];

  for (let token of tokens) {
    if (token.match(/\d+(\.\d+)?/)) {
      numbers.push(parseFloat(token));
    } else {
      operators.push(token);
    }
  }

  if (numbers.length !== operators.length + 1) {
    throw new Error('Invalid expression');
  }

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let nextNumber = numbers[i + 1];

    if (operator === '+') {
      result += nextNumber;
    } else if (operator === '-') {
      result -= nextNumber;
    } else if (operator === '*') {
      result *= nextNumber;
    } else if (operator === '/') {
      result /= nextNumber;
    } else if (operator === '%') {
      result *= nextNumber / 100;
    } else if (operator === '^') {
      result = Math.pow(result, nextNumber);
    }
  }

  return result;
}
