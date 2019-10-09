// e.target.getAttribute("class").includes("keyOperator")
// 2 types of zero
// rewrite + - * /
// separate spring with the operator as the separator: string.split(",")

const keyPlus = document.getElementById("key+");
const keyMinus = document.getElementById("key-");
const keyMultiply = document.getElementById("key*");
const keyDivide = document.getElementById("key/");
const keyNum = document.getElementsByClassName("keyNum");
const keyOperator = document.getElementsByClassName("keyOperator")
const keyAC = document.getElementById("keyAC");
const keyEqual = document.getElementById("key=");
var screen = document.getElementById("screen");
var key = document.getElementsByClassName("key");
var result;
var calculated;
var calculate;
var arrayOfOperand;
var operator;
var fn;

var add = function(a, b) {
  return screen.innerHTML = a + b;
};

var substract = function(a, b) {
  return screen.innerHTML = a - b;
};

var multiply = function(a, b) {
  return screen.innerHTML = a * b;
};

var divide = function(a, b) {
  return screen.innerHTML = a / b;
};

var getOperand = function() {
  operator = screen.innerHTML.match(/[+\-*/]/);
  return arrayOfOperand = screen.innerHTML.split(operator[0]);
}

var getOperation = function() {
  operator = screen.innerHTML.match(/[+\-*/]/);
  switch (operator[0]) {
    case "+":
      fn = add
      break;
    case "-":
      fn = substract
      break;
    case "*":
      fn = multiply
      break;
    case "/":
      fn = divide
  }
}

var calculate = function() {
  return fn(parseInt(arrayOfOperand[0]), parseInt(arrayOfOperand[1]))
}

for (let index = 0; index < key.length; index++) {
  key[index].addEventListener("click", function() {
    return screen.innerHTML += this.value;
  });  
};

keyAC.onclick = function() {
  return screen.innerHTML = "";
};

keyEqual.onclick = function() {
  getOperand();
  getOperation();
  calculate();
}