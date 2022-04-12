let calculator = document.getElementById("calculator");
let screen = document.getElementById("screen");
let writer = document.getElementById("writer");
let inputsContainer = document.getElementById("inputs");

let arithmeticOperators = ["/", "*", "+", "-"];
let equalOperator = '=';
let exprStr = "";
let flag = 0;

function clearScreen() {
  exprStr = "";
  writer.value = "";
}

function backSpace() {
  exprStr = exprStr.slice(0, -1);
  console.log(exprStr);
  writer.value = exprStr;
}

function print(content, mode) {
  if (flag == 1) {
    writer.value = "";
    flag = 0;
  }
  
  for(let i=0; i<content.length; i++) {
    if(content.charAt(i) === '*') {
      content = content.substring(0,i) + '×' + content.substring(i+1);
    } else if (content.charAt(i) === '/') {
      content = content.substring(0,i) + '÷' + content.substring(i+1);
    }
  }
  console.log(content);
  writer.value += content;
}

function santize(input) {
  if (exprStr.length === 0 && isNaN(input)) {
    return "";
  }

  switch (input) {
    case "C":
      return "clear";
    case "ᐊ":
      return "del";
    case "÷":
      return "/";
    case "×":
      return "*";
    default:
      return input;
  }
}

function processInput(input) {
  if (input === "clear") clearScreen();
  else if (input === "del") backSpace();
  else if(input === '%') {
    backSpace();
    console.log('Coming soon...');
  }
  else {
    exprStr += input;

    let secondLastChar = exprStr.charAt(exprStr.length - 2);
    let lastChar = exprStr.charAt(exprStr.length - 1);
    if (
      arithmeticOperators.includes(secondLastChar) &&
      (arithmeticOperators.includes(lastChar) || lastChar === equalOperator)
    ) {
      exprStr = exprStr.substring(0, exprStr.length-2) + lastChar;
    }

    lastChar = exprStr.charAt(exprStr.length - 1)
    if (arithmeticOperators.includes(lastChar) || lastChar === equalOperator) {
      try {
        let val = eval(exprStr.slice(0, -1));
        console.log('eval: ' +val);
        exprStr = val + (lastChar === equalOperator ? '' : lastChar);
        flag = 1;
        input = exprStr;
      } catch (error) {
        console.log('error');
      }
    }
    
    console.log(exprStr);
    print(input, 0);
  }
}

function getInput() {
  navigator.vibrate([100]);
  let input = santize(this.textContent);
  processInput(input);
}

let inputs = inputsContainer.querySelectorAll("td").forEach((input) => {
  input.addEventListener("click", getInput);
  // console.log(input);
});
