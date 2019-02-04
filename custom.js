const calculator = {
	screenValue:'0',
	operand:null,
	waitingForNextOperand:false,
	operator:null,
	flag:0,
	expression:" ",
};
var array = new Array();

function onClickNumber(number) {
  const { screenValue, waitingForNextOperand } = calculator;

  if (waitingForNextOperand === true) {
    calculator.screenValue = number;
    calculator.waitingForNextOperand = false;
  } else {
    calculator.screenValue = screenValue === '0' ? number : screenValue + number;
  }
  console.log(calculator);
}

function onClickDecimal(dot) {
	if(calculator.waitingForNextOperand === true)
		return;
	//check if the screenValue already contains a decimal 
	if(!calculator.screenValue.includes(dot)) {
		//Append the decimal to first number
		calculator.screenValue += ".";
		//calculator.operand += "."
	}
}

function onClickOperator(nextOperator) {
  const { operand, screenValue, operator } = calculator
  const inputValue = parseFloat(screenValue);
  if (operator && calculator.waitingForNextOperand)  {
    calculator.operator = nextOperator;
    return;
  }

  if (operand == null) {
    calculator.operand = inputValue;
    flag = 1;

  } else if (operator) {
    const firstOperand = operand || 0;
    const result = calculate(firstOperand,operator,inputValue);
    calculator.screenValue = String(result);
    if(flag == 1 )
    	{
    	clearExpression();
    	calculator.expression += parseFloat(firstOperand) ;// String(operator) +parseFloat(inputValue);
  		console.log(calculator.expression);
        flag = 0;
        }

		calculator.expression += String(operator)+String(inputValue);
		calculator.operand = result;

  }

  calculator.waitingForNextOperand = true;
  calculator.operator = nextOperator;

  if(calculator.waitingForNextOperand == true && calculator.operator == '=')
  	{	
  		const calculation = calculator.expression + String('=')+ calculator.screenValue;
  		console.log(calculation);
  		array.push(calculation);
  		updateLog();
    	clearExpression();
    	calculator.operand = calculator.screenValue;
      calculator.operator = null;
      flag = 1;
    	console.log(calculator.expression);
  	}

  console.log(calculator);
}

function calculate(firstNumber, operator, secondNumber){
  switch(operator) {
    case '+' :
      return parseFloat(firstNumber) + parseFloat(secondNumber)
    case '-' :
      return firstNumber - secondNumber;
    case '*' :
      return firstNumber * secondNumber;
    case '/' :
      return firstNumber / secondNumber;
    case '%' :
      return firstNumber % secondNumber;
    case '=' : 
      return secondNumber;
    default:
      return;
}
}


function resetCalculator() {
  calculator.screenValue = '0';
  calculator.operand = null;
  calculator.waitingForNextOperand = false;
  calculator.operator = null;
  calculator.expression = '0';
}

function updateDisplay() {
  const display = document.querySelector('.result');
  const exp = document.querySelector('.input-screen')
  display.value = calculator.screenValue;
  exp.value = calculator.expression;
}

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

function clearExpression(){
  calculator.expression = "";
};
//updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    onClickOperator(target.value);
		updateDisplay();
    return;
  }

  if(target.classList.contains('equal'))
  	 clearExpression();

  if (target.classList.contains('decimal')) {
    onClickDecimal(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

  onClickNumber(target.value);
  updateDisplay();
});


function onClickEqual() {
	res = calculate(queue);
}


