// e.target.getAttribute("class").includes("keyOperator")
// 2 types of zero

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

var checkCalculated = function() {
  if (calculated === true) {
    return screen.innerHTML = "0"
    // return (e.target.getAttribute("class").includes("keyOperator")
    //   ? (screen.innerHTML = this.value)
    //   : (screen.innerHTML = "0"))
  }
};

for (let index = 0; index < key.length; index++) {
  key[index].addEventListener("click", function(e) {
    checkCalculated();
    calculated = false;
    // debugger;
    if (screen.innerHTML === "0") {
      return (e.target.getAttribute("class").includes("keyOperator") 
        ? (screen.innerHTML = this.value)
        : (screen.innerHTML = parseInt(this.value)));
    } else {
      return (e.target.getAttribute("class").includes("keyOperator")
        ? (screen.innerHTML = screen.innerHTML + this.value)
        : (screen.innerHTML = screen.innerHTML + parseInt(this.value)));
    }
  })  
}

function calculate() {
  calculated = true
  return screen.innerHTML = eval(screen.innerHTML);
}

keyEqual.onclick = calculate;
keyAC.onclick = function() {
  calculated = false;
  return screen.innerHTML = "0"
}