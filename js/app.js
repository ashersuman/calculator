let calculator = document.getElementById('calculator');
let screen = document.getElementById('screen');
let writer = document.getElementById('writer');
let inputsContainer = document.getElementById('inputs');

let expression = [0];
let exprStr = '';
let operatorCount = 0;
let expectingOperator = 1;

function clearScreen() {
  exprStr = '';
  writer.value = '';
}

function backSpace() {

}

function print(content, mode) {
  writer.value += content;
}

function santize(input) {
  operators = ['/', '*', '+', '-', '%']
  if(exprStr.length === 0 && isNaN(input)) {
    return '';
  }
  switch (input) {
    case 'C':
      return 'clear';
    case 'ᐊ':
      return 'del';
    case '÷':
      return '/';
    case '×':
      return '*';
    default:
      return input;
  }
}

function checkValidStack() {
  // must contain 1 operator
  // and 2 operand
  
}

function evaluatePercent() {
  let a = expression.pop();
  a = a/100;
  expression.push(a+'');
  console.log(expression);
}

function evaluate() {
  val = expression.pop();
  if(val === '*') {

  }
  
  // if(checkValidStack()) {
    let b = expression.pop();
    let operand = expression.pop();
    let a = expression.pop();
    let ans;
    switch(operand) {
      case '/': 
        ans = parseInt(a) / parseInt(b);
        break;
      case '*':
        ans = parseInt(a) * parseInt(b);
        break;
      case '-':
        ans = parseInt(a) - parseInt(b);
        break;
      case '+':
        ans = parseInt(a) + parseInt(b);
        break;
    }
    return ans;
  // }
}

function processInput(input) {
  if(input === 'clear') clearScreen();
  else if(input === 'del') backSpace();
  else {
    operators = ['/', '*', '+', '-', '%']
    if(operators.includes(input)) {
      if(!expectingOperator){
        input = '';
      } else {
        operatorCount = 1;
        expectingOperator = 0;
      } 
    } else {
      expectingOperator = 1;
    }
    exprStr += input;
    
    print(input, 0);
    // evaluate();
    expression.push(input);
  }
  console.log(expression);
  console.log(exprStr);
}

function getInput() {
  let input = santize(this.textContent);
  processInput(input);
}

let inputs = inputsContainer.querySelectorAll('td').forEach((input) => {
  input.addEventListener('click', getInput);
  // console.log(input);
});