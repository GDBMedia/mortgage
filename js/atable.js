
// 	var ageIvalue = 0;
// 	var ageAvalue = 0;
// 	var irvalue = 0;
// $('#age').slider({
// 	formatter: function(value) {
// 		$("#agevalue").val(value);
//
// 		ageIvalue = value;
//
// 		// $("#ageIvalue").text(ageIvalue);
// 		//this how you output slider value
// // 		$("#retire").html('<div class="form-group"><label for="points">Desired Age of Final Payment:</label><br><input id="ageA" data-slider-id="ageAslider" type="text" data-slider-tooltip="hide" class="inputs" data-slider-min="' + (ageIvalue + 1) + '" data-slider-max="80" data-slider-step="1" data-slider-value="' + ageAvalue + '"/><h2 id="ageAvalue" class="pull-right"></h2></div>');
// // 		$("#ageA").slider({
// // 			formatter: function(value) {
// // 			ageAvalue = value;
// // 			$("#ageAvalue").text(ageAvalue);
// // 	}
// // });
// 	}
// });
$(function(){
	$("#update").hide()
	var example;
$("#submit").click(function(event){
	var balance = $("#principal").val();
	var interest = $("#irrate").val();
	var term = $("#term").val();
	example = new AmortizationTable(balance,interest,term);
	$("#tableBody").html(example.atableOutput());
	var test = $("#month12").val();
	console.log(test);
	$("#update").show()
	if(!"#principal"){
		("#myPrincipal").addClass("has-error");
		alert ("fill in your principlal, duh")
	}
	if(!"#irrate"){
		("#myInterestRate").addClass("has-error");
	}
	if(!"#term"){
		("#myTerm").addClass("has-error");
	}
	event.preventDefault();
	});
	$("#update").click(function(event) {
		var valuesToUpdate = [];
		var idToGrab = "";
		var valueOfMonthlyPayment = 0;
		for(var h = 0; h<example.getTimeMortgage(); h++){
			idToGrab='#month'+h;
			valueOfMonthlyPayment = $(idToGrab).val();
			valueOfMonthlyPayment=parseFloat(valueOfMonthlyPayment);
			valuesToUpdate.push(valueOfMonthlyPayment);
		}
		example.updateTable(valuesToUpdate);
		$("#tableBody").html(example.atableOutput());
		// console.log(valuesToUpdate); VALUES PASSED
		// $("#tableBody").html(example..updateTable(valuesToUpdate));
		example.compareLoan();
		event.preventDefault();
		return false;

	});

});

// function getTime(balance, monthly, interest){
// 	// debugger;
// 	var B = balance;
// 	var Pay = monthly;
// 	var I = (interest/1200);
// 	var BI = 0;
// 	var Prin = 0;
// 	var N = 0;
// 	while(B > 0){
// 		BI = B * I;
// 		Prin = Pay - BI;
// 		B -= Prin;
// 		N++;
// 		console.log(B);
// 	}
// 	return (N/12);
// }
///ACTUAL LOGIC
class AmortizationTable{
	constructor(principal, interest, time){
		this.principal = parseFloat(principal);
		this.balance = this.principal;
		this.interest = parseFloat(interest)/1200; /// inputed as APR, converted to monthly rate
		this.time = parseFloat(time)*12; //inputed as years so months
		this.newTime = 0.0;
		this.monthlyPayment = this.setMonthlyPayment();
		this.row = new Float64Array(7);//// 1-dimmenisonal 7 values, then new row
		this.table = this.tableGenerator();
		this.intialGeneratedLastRow = new Float64Array(7);
		this.newGeneratedLastRow = new Float64Array(7);
		this.initialLoanLength = 0;
		this.newLoanLength = 0;
		this.totalInterestSavings = 0;
		this.totalSavings = 0;
		this.totalMonthsSaved = 0;
	}
	tableGenerator(){
	 var table = [];
	 var interestRate = this.interest;
	 var payment = this.monthlyPayment;
	 var balance = this.balance;
	 var interestPaid= 0;
	 var principalPaid = 0;
	 var totalInterest= 0;
	 var totalprincipal = 0;
	 var totalPaid= 0;
	 var row = new Float64Array(7);
////
	 for(var i=0; balance>0.001; i++){
		 row = new Float64Array(7);
		 interestPaid = balance * interestRate;
		 principalPaid = payment - interestPaid;
		 balance-=principalPaid;
		 totalInterest+=interestPaid;
		 totalprincipal+=principalPaid;
		 totalPaid+=interestPaid+principalPaid;
		 row[0]= payment.toFixed(2);
		 row[1]=interestPaid.toFixed(2);
		 row[2]=principalPaid.toFixed(2);
		 row[3]=balance.toFixed(2);
		 row[4]=totalInterest.toFixed(2);
		 row[5]=totalprincipal.toFixed(2);
		 row[6]=totalPaid.toFixed(2);
		 table.push(row);
	 }
	 
	 
	 
	 this.time = table.length;
	 return table;
 }
 /////
 updateTable(valuesToUpdate){
 	this.intialGeneratedLastRow = this.tableGenerator()[this.tableGenerator().length-1];
 	this.initialLoanLength = this.tableGenerator().length;
	var table = [];
	var newValues = [];
	newValues=valuesToUpdate;
	var interestRate = this.interest;
	var payment = 0.0; //NOW VARIED
	var balance = this.balance;
	var interestPaid= 0;
	var principalPaid = 0;
	var totalInterest= 0;
	var totalprincipal = 0;
	var totalPaid= 0;
	var row = new Float64Array(7);
////
	for(var i=0; balance>0.001; i++){
		row = new Float64Array(7);

		payment= newValues[i];
		if(balance < payment){
			payment = balance + (balance*interestRate);
		}
		interestPaid = balance * interestRate;
		principalPaid = payment - interestPaid;
		balance-=principalPaid;
		totalInterest+=interestPaid;
		totalprincipal+=principalPaid;
		totalPaid+=interestPaid+principalPaid;
		row[0]= payment.toFixed(2);
		row[1]=interestPaid.toFixed(2);
		row[2]=principalPaid.toFixed(2);
		row[3]=balance.toFixed(2);
		row[4]=totalInterest.toFixed(2);
		row[5]=totalprincipal.toFixed(2);
		row[6]=totalPaid.toFixed(2);
		table.push(row);
	}
	console.log(this.intialGeneratedLastRow);
	this.newGeneratedLastRow = row;
	this.newLoanLength = table.length;
	this.table = table;
	return table;

}


	//monthly payment , interestpaid, priniciapl paid, remaining balance-=principal paid, total interest, total principal, total paid
	setMonthlyPayment(){
		var returnValue = (this.principal * this.interest * (Math.pow(1 + this.interest, this.time)) / (Math.pow(1 + this.interest, this.time) - 1));
		return returnValue;
	}


	getMonthlyPayment(){
		console.log(this.monthlyPayment);
		return this.monthlyPayment;
	}
	ageAdjustor(age){
		var currentbalance = this.table[age];
		console.log(currentbalance);
		return currentbalance[3];
	}
	getTimeMortgage(){
		return this.table.length;
	}
	atableOutput(){
		var outString = "<tr><th>Month #</th><th>Monthly Payment</th><th>Interest Paid</th><th>Principal Paid</th><th>Balance Remaining</th><th>Total Interest Paid</th><th>Total Principal Paid</th><th>Total Paid</th></tr>";
		var temp = new Float64Array(7);
		for(var i=0; i<this.table.length; i++){
			temp = this.table[i];
			console.log(temp);
			// outstring+='<tr'
			outString+='<tr><th>'+(i+1) + '</th><th><input class="MP" id="month'+i+'" type="number" value="'+temp[0]+'"></th>';
			for(var j=1; j<7; j++){
				outString+="<th>"+temp[j]+"</th>"
			}
			outString+="</tr>"
		}
		return outString;
	}

	updateValue(row, value){
		var temp = this.table[row]
		temp[0]=value;
		this.table[row]=temp;
	}
	compareLoan(){
		// this.intialGeneratedLastRow 
		// this.newGeneratedLastRow

		// var totalSavings=0;
		// var totalInterestSavings=0;
		// var totalMonthsSaved = 0;

		this.totalInterestSavings = this.intialGeneratedLastRow[4] - this.newGeneratedLastRow[4];
		this.totalSavings = this.intialGeneratedLastRow[6] - this.newGeneratedLastRow[6];
		this.totalMonthsSaved =  this.initialLoanLength - this.newLoanLength;
		console.log(this.totalInterestSavings);
		console.log(this.totalSavings);
		console.log(this.totalMonthsSaved);
	}

}
	// 	////FIRST TABLE ROW
	// 	this.row[0]=this.monthlyPayment;
	// 	this.row[1]=(this.balance*this.row[0]);//interest=balance*monthly interest
	// 	this.row[2]=(this.row[0]-this.row[1]);//remaining balance-=principal paid
	// 	this.row[3]=(this.row[3]-this.row[2]);//balance-=principalPaid
	// 	this.row[4]=this.row[3];//†otalinterestpaid+=interest
	// 	this.row[5]=this.row[2];//totalprincipalpaid+=principal
	// 	this.row[6]=(this.row[3]+this.row[2]);//totalpaid=†otalinterestpaid+totalprincipalpaid
	// 	// while(this.row[3]>0)
	// 	for(var i=1; i<this.time; i+=7){
	// 			this.row[0+i]=this.row[0];//NEED TO EDIT this.row[0]
	// 			this.row[1+i]=(this.row[i-5]*this.row[0]);//interest=balance*monthly interest
	// 			this.row[2+i]=(this.row[0]-this.row[1+i]);//NEED TO EDIT this.row[0]
	// 			this.row[3+i]=(this.row[i-7]-this.row[i-5]);//balance-=principalPaid
	// 			this.row[4+i]=this.row[3];//†otalinterestpaid+=interest
	// 			this.row[5+i]=this.row[2];//totalprincipalpaid+=principal
	// 			this.row[6+i]=this.row[3]+this.row[2];//totalpaid=†otalinterestpaid+totalprincipalpaid
	// 			// if(this.row[3]<)
	// 		}
	// 	}
	// }
	// [0 = monthlyPayment], [1 = remainingBlance*monthlyinterest], [2 = monthlyPayment- [1]]
