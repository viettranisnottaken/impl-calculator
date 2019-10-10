// e.target.getAttribute("class").includes("keyOperator")
// 2 types of zero
// rewrite + - * /
// separate spring with the operator as the separator: string.split(",")

const keyPlus = document.getElementById("key+");
const keyMinus = document.getElementById("key-");
const keyMultiply = document.getElementById("key*");
const keyDivide = document.getElementById("key/");
const keyNum = document.getElementsByClassName("keyNum");
const keyOperator = document.getElementsByClassName("keyOperator");
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
  return (screen.innerHTML = a + b);
};

var substract = function(a, b) {
  return (screen.innerHTML = a - b);
};

var multiply = function(a, b) {
  return (screen.innerHTML = a * b);
};

var divide = function(a, b) {
  return (screen.innerHTML = a / b);
};

var getOperand = function() {
  // operator = screen.innerHTML.match(/[+\-*/]/);
  return (arrayOfOperand = screen.innerHTML.split(/[+\-*/]/));
};

var getOperation = function() {
  operator = screen.innerHTML.match(/[+\-*/]/g);
  switch (operator[0]) {
    case "+":
      fn = add;
      break;
    case "-":
      fn = substract;
      break;
    case "*":
      fn = multiply;
      break;
    case "/":
      fn = divide;
  }
};

var calculate = function() {
  calculated = true;
  return fn(parseInt(arrayOfOperand[0]), parseInt(arrayOfOperand[1]));
};

for (let index = 0; index < key.length; index++) {
  key[index].addEventListener("click", function() {
    return (screen.innerHTML += this.value);
  });
}

keyAC.onclick = function() {
  calculated = false;
  return (screen.innerHTML = "");
};

keyEqual.onclick = function() {
  getOperand();
  getOperation();
  calculate();
};

function Token(type, value) {
  this.type = type;
  this.value = value;
}

function isComma(ch) {
  return ch === ",";
}

function isDigit(ch) {
  return /\d/.test(ch);
}

function isLetter(ch) {
  return /[a-z]/i.test(ch);
}

function isOperator(ch) {
  return /[+\-*/]/.test(ch);
}

function isLeftParenthesis(ch) {
  return ch === "(";
}

function isRightParenthesis(ch) {
  return ch == ")";
}

str.forEach(function(char, idx) {
  if (isDigit(char)) {
    result.push(new Token("Literal", char));
  } else if (isLetter(char)) {
    result.push(new Token("Variable", char));
  } else if (isOperator(char)) {
    result.push(new Token("Operator", char));
  } else if (isLeftParenthesis(char)) {
    result.push(new Token("Left Parenthesis", char));
  } else if (isRightParenthesis(char)) {
    result.push(new Token("Right Parenthesis", char));
  } else if (isComma(char)) {
    result.push(new Token("Function Argument Separator", char));
  }
});

var tokens = tokenize("89sin(45) + 2.2x/7");
tokens.forEach(function(token, index) {
  console.log(index + "=> " + token.type + "(" + token.value + ")");
});

var assoc = {
  "^": "right",
  "*": "left",
  "/": "left",
  "+": "left",
  "-": "left"
};

var prec = { "^": 4, "*": 3, "/": 3, "+": 2, "-": 2 };

Token.prototype.precedence = function() {
  return prec[this.value];
};
Token.prototype.associativity = function() {
  return assoc[this.value];
};

function parse(inp) {
  var outQueue = [];
  var opStack = [];
}

Array.prototype.peek = function() {
  return this.slice(-1)[0];
};

function ASTNode(token, leftChildNode, rightChildNode) {
  this.token = token.value;
  this.leftChildNode = leftChildNode;
  this.rightChildNode = rightChildNode;
}

Array.prototype.addNode = function(operatorToken) {
  rightChildNode = this.pop();
  leftChildNode = this.pop();
  this.push(new ASTNode(operatorToken, leftChildNode, rightChildNode));
};

formASTNode.prototype.toString = function(count) {
  if (!this.leftChildNode && !this.rightChildNode)
    return this.token + "\t=>null\n" + Array(count + 1).join("\t") + "=>null";
  var count = count || 1;
  count++;
  return (
    this.token +
    "\t=>" +
    this.leftChildNode.toString(count) +
    "\n" +
    Array(count).join("\t") +
    "=>" +
    this.rightChildNode.toString(count)
  );
};
