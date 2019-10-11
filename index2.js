const keyNum = document.getElementsByClassName("keyNum");
const keyOperator = document.getElementsByClassName("keyOperator");
const keyAC = document.getElementById("keyAC");
const keyEqual = document.getElementById("key=");
var screen = document.getElementById("screen");
var key = document.getElementsByClassName("key");
var calculated;

var isCalculated = function() {
  if (calculated) {
    return (screen.innerHTML = "");
  }
};

Array.prototype.peek = function() {
  return this[this.length - 1];
};

var Infix = function(inputStr) {
  var output = [];
  var stack = [];
  var infixAsToken = [];

  var operators = ["^", "*", "/", "+", "-"];
  var braces = ["(", ")"];
  var temp = "";
  var precedence = { "^": 3, "*": 2, "/": 2, "+": 1, "-": 1, "(": 0, ")": 0 };

  this.isNum = function(char) {
    return !isNaN(char);
  };

  this.isOperator = function(char) {
    if (operators.indexOf(char) != -1) {
      return true;
    }
    return false;
  };

  this.isBraces = function(char) {
    if (braces.indexOf(char) != -1) {
      return true;
    }
    return false;
  };

  this.convertToTokens = function() {
    if (inputStr.charAt(0) === "+" || inputStr.charAt(0) === "-") {
      inputStr = "0" + inputStr;
    }

    for (let i = 0; i < inputStr.length; i++) {
      if (
        this.isOperator(inputStr.charAt(i)) ||
        this.isBraces(inputStr.charAt(i))
      ) {
        if (temp.length !== 0) {
          infixAsToken.push(temp);
          temp = "";
        }
        infixAsToken.push(inputStr.charAt(i));
        continue;
      }

      if (!isNaN(inputStr.charAt(i))) {
        temp = temp + inputStr.charAt(i);
        continue;
      }
    }
    if (temp.length !== 0) {
      infixAsToken.push(temp);
      temp = "";
    }
  };

  this.toPostfix = function() {
    for (let i = 0; i < infixAsToken.length; i++) {
      if (this.isNum(infixAsToken[i])) {
        output.push(infixAsToken[i]);
      } else if (this.isOperator(infixAsToken[i])) {
        if (stack.length === 0) {
          stack.push(infixAsToken[i]);
        } else {
          while (precedence[stack.peek()] >= precedence[infixAsToken[i]]) {
            if (
              infixAsToken[i] === "^" &&
              precedence[stack.peek()] === precedence[infixAsToken[i]]
            ) {
              break;
            }
            output.push(stack.pop());
            if (stack.length === 0) {
              break;
            }
          }
          stack.push(infixAsToken[i]);
        }
        console.log(stack + output);
      } else if (this.isBraces(infixAsToken[i])) {
        if (infixAsToken[i] === "(") {
          stack.push("(");
        } else {
          while (stack.peek() != "(") {
            output.push(stack.pop());
          }
          stack.pop();
        }
      }
    }

    if (stack.length !== 0) {
      while (stack.length !== 0) {
        output.push(stack.pop());
      }
    }

    return output;
  };

  this.calculate = function(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    var ans = 0;
    switch (op) {
      case "^":
        ans = Math.pow(a, b);
        break;
      case "*":
        ans = a * b;
        break;
      case "/":
        ans = a / b;
        break;
      case "+":
        ans = a + b;
        break;
      case "-":
        ans = a - b;
        break;
    }
    return ans;
  };

  this.getAns = function() {
    var no = 0;
    var tempAns = 0;
    calculated = true;

    for (let i = 0; i < output.length; i++) {
      if (this.isOperator(output[i])) {
        ++no;
      }
    }

    for (let i = 0; i < no; i++) {
      for (let j = 0; j < output.length; j++) {
        if (this.isOperator(output[j])) {
          tempAns = this.calculate(output[j - 2], output[j - 1], output[j]);
          output[j - 2] = tempAns;
          output.splice(j - 1, 2);
          break;
        }
      }
    }

    return output[0];
  };
};

function infixToPostfix(inputStr) {
  if (inputStr.length === 0 || inputStr === null) {
    return false;
  }

  var infix = new Infix(inputStr);
  infix.convertToTokens();
  infix.toPostfix();
  return infix.getAns();
}

for (let index = 0; index < key.length; index++) {
  key[index].addEventListener("click", function() {
    // isCalculated();
    calculated = false;
    return (screen.innerHTML += this.value);
  });
}

keyAC.onclick = function() {
  calculated = false;
  return (screen.innerHTML = "");
};

keyEqual.onclick = function() {
  calculated = true;
  return (screen.innerHTML = infixToPostfix(screen.innerHTML));
};
