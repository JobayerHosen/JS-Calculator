var expression = "";
let binary = false;
const res = document.getElementById("res");

function resUpdate() {
	res.innerHTML = expression;
}

//all button's click actions
function buttonPress(e) {
	switch (e.id) {
		case "btnClr":
			expression = "";
			break;
		case "btnMul":
			expression += "*";
			break;
		default:
			expression += e.innerText;
	}
	resUpdate();
}

function pressBin(e) {
	function toggleNonBinBtn(binary) {
		let nonBins = document.querySelectorAll(".non-bin");
		if (binary) {
			for (let nBin of nonBins) {
				nBin.setAttribute("disabled", "true");
			}
		} else {
			for (let nBin of nonBins) {
				nBin.removeAttribute("disabled");
			}
		}
	}

	binary = !binary;
	e.classList.toggle("bin");
	toggleNonBinBtn(binary);
}

function pressEql() {
	try {
		if (binary) {
			let result = converToDecimal();
			result = Math.floor(eval(result));
			expression = converToBinary(result);
		} else {
			expression = eval(expression);
		}
	} catch (e) {
		expression = "Syntax Error";
	}
	resUpdate();
}

/*takes the binary expression, return it's decimal form ("101+010-001" => "5+2-1") */
function converToDecimal() {
	let exp = expression.slice();
	let regEx = /[+\-*/]/g;
	//[+, -]
	let operators = expression.match(regEx);
	for (let op of operators) {
		exp = exp.replace(op, " ");
	}
	//[5, 2, 1]
	let operands = exp.split(" ").map((n) => parseInt(n, 2));

	//"5+2-1"
	exp = operands[0];
	for (let i = 1; i < operands.length; i++) {
		exp += operators[i - 1];
		exp += operands[i];
	}
	return exp;
}

/*takes the decimal result return it's binary value ("6" => "110") */
function converToBinary(result) {
	return result.toString(2);
}
