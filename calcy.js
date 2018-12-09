// A set of variables to define the calculator

const calculatorObject = {
	screenValue:'0',
	firstNumber:null,
	flag:false,
	secondNumber:null,
	operator:null,
	expression: "",
	debug:true;

};

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

	if(debug)
		console.log(calculatorObject);
}

//Function to handle a decimal

function onClickDecimal(dot) {
	if(calculatorObject.f
}