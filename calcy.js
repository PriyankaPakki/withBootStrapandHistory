// A set of variables to define the calculator

const calculatorObject = {
	screenValue:'0', //value on the screen
	firstNumber:null,
	flag:false, //indicating if we are waitin for an second number or not
	secondNumber:null,
	operator:null,
	expression: "",//for displaying the calculation in history log
	debug:true,

};

var array = new Array();


//Function that takes care when a digit is clicked

function onClickNumber(number){

	const {screenValue, flag, firstNumber} = calculatorObject;

	//if first number exists and operator is not =
	if(flag === true)
	{
		//then set the screen to the second number entered
		calculatorObject.secondNumber = number;
		calculatorObject.screenValue = calculatorObject.secondNumber;
		//As we already got our second number we dont need it so
		calculatorObject.flag = false;
	}
	else
	{
		//if its the first number and non-zero, we append to the value on screen
		if(screenValue === '0')
			calculatorObject.screenValue = number;
		else
			calculatorObject.screenValue = screenValue + number;
	}

	if(calculatorObject.debug == true)
		console.log(calculatorObject);
}

//Function to handle a decimal

function onClickDecimal(dot) {
	if(calculatorObject.flag === true)
		return;
	//check if the screenValue already contains a decimal 
	if(!calculatorObject.screenValue.includes(dot)) {
		//Append the decimal to first number
		calculatorObject.screenValue += ".";
		calculatorObject.firstNumber += "."
	}
}

//Function to handle operators (3 cases)

function onClickOperator(secondOperator) {
	var {firstNumber,operator, secondNumber, screenValue} = calculatorObject;
	//converting the screen value into a number
	const input = parseFloat(screenValue);
      
    calculatorObject.screenValue = secondOperator;
    if(calculatorObject.debug == true) {
    	console.log(calculatorObject);
    }

    if(firstNumber == null){
    	calculatorObject.firstNumber = input;
    }

    if(operator) {
    	firstNumber = firstNumber || 0;
    	const secondNumber = input;
    	const result = performCalculation [operator](firstNumber,secondNumber);
    	calculatorObject.screenValue = String(result);

    	if(operator != '=')
    	{
    		calculatorObject.expression += String(firstNumber) + String(operator) + String(secondNumber) + String('=') + String(result);
    		array.push(calculatorObject.expression);
    		updateLog();
    		clearExpression();
    	}
    	else
    	{
    		calculatorObject.firstNumber = result;
    		calculatorObject.operator = null;
    	}
    	if(calculatorObject.debug == true)
    		console.log(calculatorObject.expression);

    }

    //set the flag and operator as the secondOperator
    calculatorObject.flag = true;
    calculatorObject.operator = secondOperator;

    console.log(calculatorObject);  
    console.log(array); 

}

const performCalculation = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => parseFloat(firstNumber) + parseFloat(secondNumber),

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber
};

//function to set the calculator screen to 0
function updateDisplay() {
  const display = document.querySelector('.calculator-display');
  display.value = calculatorObject.screenValue;
}

updateDisplay();

function updateLog()
{  
   // (var i = array.length - 1; i >= 0; i--) {
    //array =  array.reverse();
    var i = array.length -1;
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(array[i]));
    ul.appendChild(li);
  //}
}

//for handling (0-9) (+,-,/,*,=) (.) (AC) listen for clicks on calculator
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  //return if a target doesnt match a button
  if (!target.matches('button')) {
    return;
  }
  //if target is an operator handle it with function
  //if(target.classList.contains('operator') && target.value === '=') {
  //  calculator.waitingForSecondOperand = false;
  //}
  if (target.classList.contains('operator')) {
    onClickOperator(target.value);
	updateDisplay();
    return;
  }
  // if target is a . take care
  if (target.classList.contains('decimal')) {
    onClickDecimal(target.value);
	updateDisplay();
    return;
  }
  //if target is a C
  if (target.classList.contains('clear')) {
    resetCalculator();
	updateDisplay();
    return;
  }
  
  onClickNumber(target.value);
  updateDisplay();

});


function resetCalculator() {
  calculatorObject.screenValue = '0';
  calculatorObject.firstNumber= null;
  calculatorObject.secondNumber = null;
  calculatorObject.flag = false;
  calculatorObject.expression = "";
  calculatorObject.operator = null;
  if(calculatorObject.debug == true)
  	console.log(calculatorObject);
}

function clearExpression(){
  calculatorObject.expression = "";
  calculatorObject.operator = null;
};