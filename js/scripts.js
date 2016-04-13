class AmortizationTable{
	constructor(principal, interest, time){
		this.principal = parseFloat(principal);
		this.balance = this.principal;
		this.interest = parseFloat(interest)/1200; /// inputed as APR, converted to monthly rate
		this.time = parseFloat(time)*12; //inputed as years so months 
		this.monthlyPayment = (this.principal * this.interest * (Math.pow(1 + this.interest, this.time)) / (Math.pow(1 + this.interest, this.time) - 1));
		this.row = new Float64Array[7*this.time];//// 1-dimmenisonal 7 values, then new row
		this.table = [this.time];
	}
	getMonthlyPayment(){
		console.log(this.monthlyPayment);
		return this.monthlyPayment;
	}
	//monthly payment , interestpaid, priniciapl paid, remaining balance-=principal paid, total interest, total principal, total paid 
	tableGenerator(){
		////FIRST TABLE ROW
		this.row[0]=this.monthlyPayment;
		this.row[1]=(this.balance*this.row[0]);//interest=balance*monthly interest
		this.row[2]=(this.row[0]-this.row[1]);//remaining balance-=principal paid
		this.row[3]=(this.row[3]-this.row[2]);//balance-=principalPaid
		this.row[4]=this.row[3];//†otalinterestpaid+=interest
		this.row[5]=this.row[2];//totalprincipalpaid+=principal
		this.row[6]=(this.row[3]+this.row[2]);//totalpaid=†otalinterestpaid+totalprincipalpaid
		// while(this.row[3]>0)
		for(var i=1; i<this.time; i+=7){
				this.row[0+i]=this.row[0];//NEED TO EDIT this.row[0]
				this.row[1+i]=(this.row[i-5]*this.row[0]);//interest=balance*monthly interest
				this.row[2+i]=(this.row[0]-this.row[1+i]);//NEED TO EDIT this.row[0]
				this.row[3+i]=(this.row[i-7]-this.row[i-5]);//balance-=principalPaid
				this.row[4+i]=this.row[3];//†otalinterestpaid+=interest
				this.row[5+i]=this.row[2];//totalprincipalpaid+=principal
				this.row[6+i]=this.row[3]+this.row[2];//totalpaid=†otalinterestpaid+totalprincipalpaid
				// if(this.row[3]<)
			}
		}
	}
	[0 = monthlyPayment], [1 = remainingBlance*monthlyinterest], [2 = monthlyPayment- [1]]
}
// //  calculateMonthlyPayment(p, i, n){
// // 		// console.log(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
// // 		return (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
// // }	

// }

// // // class form
// // function mortgageCalculator (input){

// // }
// // function processObject{

// // }
// // givern monehtly payment let user know when done 
// function calculateStandardMonthlyPayment(p, i, n){
// 		// console.log(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
// 		return (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
// }

// function endOfMortgageBasedOnMonthlyPayment(input){
// 	var principal = parseFloat(input[0]);
// 	var monthlyPayment = parseFloat(input[1]);
// 	var startAge = parseFloat(input[3]);
// 	// var endAge = parsefloat(input[4]);
// 	input[4] = (principal/monthlyPayment)/12;
// 	return input[4];
// }
// function mortrgageAmortizationTable(){
// 	var rowOfArray = new Float64Array();
// 	var returnArray = [];
	
// 	var 






// 	// console.log("ERROR calculatorChoice"); // not needed
// 	return "ERROR calculatorChoice";
// }
// P = principal, the initial amount of the loan
// I = the annual interest rate (from 1 to 100 percent)
// L = length, the length (in years) of the loan, or at least the length over which the loan is amortized.

// // The following assumes a typical conventional loan where the interest is compounded monthly. 
// // First I will define two more variables to make the calculations easier:

// J = monthly interest in decimal form = I / (12 x 100)
// N = number of months over which loan is amortized = L x 12

// this.principal * (J/(1-(1+)))
// M = P * (J/(1-(1+J) ** -N))

$(function(){
	var input= [];
	$("#submit").click(function(event){
		test = new AmortizationTable("500000.00","3.5","30");
		test.getMonthlyPayment();
		// input[0] = $("#principal").val();
		// input[1] = $("#payment").val();
		// input[2] = $("#interest").val();
		// input[3] = $("#bday").val();
		// input[4] = $("#done").val();
		// // input[5]= $("#none").val();
		// // endOfMortgageBasedOnMonthlyPayment(input);
		// endOfMortgageBasedOnMonthlyPayment(input)
		// $("#done").val(endOfMortgageBasedOnMonthlyPayment(input));
		// console.log(input);
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
event.preventDefault();

	



});




