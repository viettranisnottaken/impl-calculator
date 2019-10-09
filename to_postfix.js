Array.prototype.peek = function() {
  return this[this.length - 1];
};
/**
 *This function accepts a string input for calculation, turns it into
 *an array of token in infix notation, futher into postfix notation and
 *returns an answer to the inputStr passed in or false if an error was
 *found in the inputStr
 **/
function infix2postfix(inputStr) {
  //check if input length is empty
  if (inputStr.length === 0 || inputStr === null) {
    return false;
  }

  var infix = new infixClass(inputStr.replace(/ /g, ""));
  infix.convert2Tokens();
  var errorStatus = infix.check4Error();
  if (errorStatus === true) {
    return false;
  } else {
    infix.toPosfix();
    return infix.getAns();
  }
}

/**
Class that performs series of operations required for perfoming infix to postfix
**/
var infixClass = function(inputStr) {
  var output = []; //array that holds the output in postfix notation
  var stack = []; //stack for holding the operators during conversion
  var infixAsToken = []; //array of inputStr as tokens

  var operators = ["^", "*", "/", "+", "-"]; //holds array of operators
  var braces = ["(", ")"]; //host array of braces
  var temp = "";
  var error = false; //if there is an error this variable is set to true
  var precedence = { "^": 3, "*": 2, "/": 2, "+": 1, "-": 1, "(": 0, ")": 0 }; //holds an array of operators and their precedence value

  /**
    converts the inputString to postfix
    **/
  this.convert2Tokens = function() {
    //check if the first character is + or -
    if (inputStr.charAt(0) == "+" || inputStr.charAt(0) == "-") {
      inputStr = "0" + inputStr;
    }

    //loop through all the values
    for (var i = 0; i < inputStr.length; i++) {
      //check if its an operator or a braces
      //Also checks if the temp buffer is empty. If its not, it pushes it unto the stack and emptys the temp
      if (
        this.isAnOperator(inputStr.charAt(i)) ||
        this.isBraces(inputStr.charAt(i))
      ) {
        if (temp.length !== 0) {
          infixAsToken.push(temp);
          temp = "";
        }
        infixAsToken.push(inputStr.charAt(i));
        continue;
      }
      //if the character is a decimal no add it to the temp
      if (inputStr.charAt(i) == ".") {
        temp = temp + ".";
        continue;
      }
      //if the character is a no, then add it to temp
      if (!isNaN(inputStr.charAt(i))) {
        temp = temp + inputStr.charAt(i);
        continue;
      }
    } //loop ends

    //check if there are still values in the temp after running through the array
    if (temp.length !== 0) {
      infixAsToken.push(temp);
      temp = "";
    }
  };

  /**
    Checks if there are any error in the input
    **/
  this.check4Error = function() {
    var prev = "op"; //no or op
    var BracesList = [];
    var BracesOutput = [];

    for (var i = 0; i < infixAsToken.length; i++) {
      if (!isNaN(infixAsToken[i])) {
        //checks if its a no
        prev = "no";
        console.log("no found");
        continue;
      } else if (this.isAnOperator(infixAsToken[i])) {
        //checks if its an operator
        console.log("op found");
        if (prev == "op") {
          //if the previous entry is an operator... error
          error = true;
          return true;
        } else {
          prev = "op"; //set previous to be an operator
        }
      } else if (this.isBraces(infixAsToken[i])) {
        if (
          (infixAsToken[i] == "(" && prev == "no") ||
          (infixAsToken[i] == ")" && prev == "op")
        ) {
          error = true;
          return true;
        }
        //accumulate all the braces to be reviewed later
        BracesList.push(infixAsToken[i]);
      } else {
        console.log("other error");
        error = true;
        return true;
      }
    }

    //checks if the last digit is an operator. If true flag error
    if (this.isAnOperator(infixAsToken[infixAsToken.length - 1])) {
      error = true;
      return true;
    }

    console.log("no error yet");

    //check if any braces were found at all. if true, then check for errors withing them
    if (BracesList.length !== 0) {
      //checks if the first brace found is ). If true, return error as true
      if (BracesList[0] == ")") {
        console.log("first char error");
        error = true;
        return true;
      }
      //check if the braces are well arranged
      for (i = 0; i < BracesList.length; i++) {
        if (BracesList[i] == "(") {
          BracesOutput.push("(");
        } else {
          if (BracesOutput.length === 0) {
            console.log("len is zero");
            error = true;
            return true;
          } else {
            BracesOutput.pop();
          }
        }
      }

      if (BracesOutput.length !== 0) {
        error = true;
        return true;
      }
    }

    return false; //no error found
  };

  /**
    performs infix2postfix conversion
    **/
  this.toPosfix = function() {
    //loop through all the infixtokens
    for (var i = 0; i < infixAsToken.length; i++) {
      if (this.isAnumber(infixAsToken[i])) {
        //if its a no, push to the output stack
        output.push(infixAsToken[i]);
      } else if (this.isAnOperator(infixAsToken[i])) {
        //if its an operator
        if (stack.length === 0) {
          //if the stack is empty, push the new operator to the stack
          stack.push(infixAsToken[i]); //push to stack
        } else {
          //while whats at the top of the stack has greater precedence, pop it off to the output
          while (precedence[stack.peek()] >= precedence[infixAsToken[i]]) {
            //if both the new entry and previous entry top of the stack are ^. Just push to output
            if (
              infixAsToken[i] === "^" &&
              precedence[stack.peek()] === precedence[infixAsToken[i]]
            ) {
              break;
            }
            output.push(stack.pop());
            if (stack.length === 0) {
              //after poping of, if the stack is now empty exit loop
              break;
            }
          }
          stack.push(infixAsToken[i]);
        }
        console.log(stack + output);
      } else if (this.isBraces(infixAsToken[i])) {
        //if its a braces
        if (infixAsToken[i] === "(") {
          //if its a left brace, push into the stack
          stack.push("(");
        } else {
          while (stack.peek() != "(") {
            //if its a right, pop off
            output.push(stack.pop());
          }
          stack.pop(); //get the ( out of the stack
        }
      }
    }

    if (stack.length !== 0) {
      while (stack.length !== 0) {
        output.push(stack.pop());
      }
    }

    return output; //return the answer in postfix
  };

  /**
    This method is for performing the final calculation on the postfix
    and it returns the answer as a float
    **/
  this.getAns = function() {
    var no = 0;
    var tempAns = 0;

    //count the no of operators and store it
    for (var i = 0; i < output.length; i++) {
      if (this.isAnOperator(output[i])) {
        ++no;
      }
    }

    //first loop for the no of operators found
    for (i = 0; i < no; i++) {
      //run through the no of available values left
      for (var j = 0; j < output.length; j++) {
        if (this.isAnOperator(output[j])) {
          tempAns = this.calculate(output[j - 2], output[j - 1], output[j]);
          output[j - 2] = tempAns;
          output.splice(j - 1, 2);
          break;
        }
      }
    }

    return output[0];
  };

  /**
    This method do the calculation
    **/
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

  /**
     checks if the character passed is a numer
     **/
  this.isAnumber = function(char) {
    return !isNaN(char);
  };

  /**
    checks if the character passed is an operator
    **/
  this.isAnOperator = function(char) {
    if (operators.indexOf(char) != -1) {
      return true;
    }
    return false;
  };

  /**
    checks if character passed is a braces
    **/
  this.isBraces = function(char) {
    if (braces.indexOf(char) != -1) {
      return true;
    }
    return false;
  };
};
