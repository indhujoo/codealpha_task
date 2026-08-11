// this variable stores whatever is typed on the screen
var screenValue = "0";

var screen = document.getElementById("screen");

// this runs whenever a number or operator button is pressed
function press(val){
  if(screenValue == "0"){
    // don't want to show 0 in front, unless its a decimal point
    if(val != "."){
      screenValue = val;
    } else {
      screenValue = screenValue + val;
    }
  } else {
    screenValue = screenValue + val;
  }
  screen.value = screenValue;
}

function clearScreen(){
  screenValue = "0";
  screen.value = screenValue;
}

function delLast(){
  screenValue = screenValue.substring(0, screenValue.length - 1);
  if(screenValue == ""){
    screenValue = "0";
  }
  screen.value = screenValue;
}

// calculates whatever is in the screen and shows the answer
function showResult(){
  try{
    var answer = eval(screenValue);
    screenValue = "" + answer;
    screen.value = screenValue;
  } catch(e){
    screen.value = "Error";
    screenValue = "0";
  }
}

// added keyboard support so you dont have to click every time
document.addEventListener("keydown", function(e){
  var key = e.key;

  if(key >= "0" && key <= "9"){
    press(key);
  } else if(key == "."){
    press(".");
  } else if(key == "+" || key == "-" || key == "*" || key == "/"){
    press(key);
  } else if(key == "Enter"){
    showResult();
  } else if(key == "Backspace"){
    delLast();
  } else if(key == "Escape"){
    clearScreen();
  }
});