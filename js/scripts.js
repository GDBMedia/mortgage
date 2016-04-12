// // class form
// function mortgageCalculator (input){

// }
// function processObject{

// }
// givern monehtly payment let user know when done 
function calculateStandardMonthlyPayment(p, i, n){
		// console.log(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
		return (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
}

function endOfMortgageBasedOnMonthlyPayment(input){
	var principal = parseFloat(input[0]);
	var monthlyPayment = parseFloat(input[1]);
	var startAge = parseFloat(input[3]);
	// var endAge = parsefloat(input[4]);
	input[4] = (principal/monthlyPayment)/12;
	return input[4];
}




$(function(){
	var input= [];
	$("#submit").click(function(event){
		input[0] = $("#principal").val();
		input[1] = $("#payment").val();
		input[2] = $("#interest").val();
		input[3] = $("#bday").val();
		input[4] = $("#done").val();
		input[5]= $("#none").val();
		// endOfMortgageBasedOnMonthlyPayment(input);
		endOfMortgageBasedOnMonthlyPayment(input)
		$("#done").val(endOfMortgageBasedOnMonthlyPayment(input));
		console.log(input);
		event.preventDefault();
	});
// 	var agevalue = $("#size").val();
// 	var irvalue = 0;
// $('#age').slider({
// 	formatter: function(value) {
// 		agevalue = value;
// 		$("#agevalue").text(agevalue);
// 	}
// });
// $('#ir').slider({
// 	formatter: function(value) {
// 		irvalue = value;
// 		$("#irvalue").text(irvalue);
// 	}
// });
// console.log(agevalue);
// console.log(irvalue);





});




