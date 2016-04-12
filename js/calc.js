function mortgageCalculator (p, i, iA, eA){
	var principal = parseFloat(p); // set to usable number 
	var interest = (parseFloat(i)/1200); // turn percentage into decimal and make the yearly interest into monthly
	var inititalAge = parseInt(iA); // set to usable number 
	var endAge = parseInt(eA); // set to usable number
	var mortgageAge = (endAge - inititalAge)*12; // mortgage age = end age - initial age
// end of mortgage (current - age = mortgagae length)

	var calculatorChoice = "standard"; // currently only supports standard 
	var mortgage;
	switch (calculatorChoice){
		case "standard":
			mortgage = calculateStandard(principal,interest,mortgageAge);
			console.log("STANDARD calculatorChoice");
	 		break;
	 	case "amortization":
	 		mortgage = calculateAmortization();
	 		console.log("AMORTIZATION calculatorChoice");
	 		break;
	 	case "ARM5":
	 		mortgage = calculateARM5();
	 		console.log("ARM5 calculatorChoice");
	 		break;
	 	case "ARM7":
	 		mortgage = calculateARM7();
	 		console.log("ARM5 calculatorChoice");
	 		break;
	 	default :
	 		mortgage = errorCalulatorChoice();
	 		break;
	}
	return mortgage;
	// return mortgage;
}
function errorCalulatorChoice(){
	// console.log("ERROR calculatorChoice"); // not needed
	return "ERROR calculatorChoice";
}
function calculateStandard(principal, rate, time){
		// var P = 400000; //principle / initial amount borrowed
		// var I = 3.5 / 100 / 12; //monthly interest rate
		// var N = 30 * 12; //number of payments months
		return calculateStandardMonthlyPayment(principal, rate, time);
}
function calculateStandardMonthlyPayment(p, i, n){
		// console.log(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
		return (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
}
var print = mortgageCalculator(435678, 3.75, 43, 65);
console.log(print);
// console.log(mortgageCalculator());
// 		var month
// 		var monthlyPayment = 
// 		var x = Math.pow((1 + (rate/12)), (time*12)),
//             monthly = (amount*x*monthly_interest)/(x-1);

// var M; //monthly mortgage payment
// var P = 400000; //principle / initial amount borrowed
// var I = 3.5 / 100 / 12; //monthly interest rate
// var N = 30 * 12; //number of payments months

// //monthly mortgage payment
// M = monthlyPayment(P, N, I);

// console.log(M);

// function monthlyPayment(p, n, i) {
//   return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
// }

