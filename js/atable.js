$(function(){
	$("#updateJ").hide()
	var example;
	$("#submitJ").click(function(event){
		var balance = $("#principal").val();
		var interest = $("#irrate").val();
		var term = $("#term").val();
		example = new AmortizationTable(balance,interest,term);
		$("#tableBody").html(example.atableOutput());
		var test = $("#month12").val();
		$("#outputsavings").hide();
		console.log(test);
		$("#updateJ").show()
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
	$("#updateJ").click(function(event) {
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
		example.compareLoan();
		event.preventDefault();
		return false;

	});

});
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
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	compareLoan(){

		this.totalInterestSavings = this.intialGeneratedLastRow[4] - this.newGeneratedLastRow[4];
		this.totalSavings = this.intialGeneratedLastRow[6] - this.newGeneratedLastRow[6];
		this.totalMonthsSaved =  this.initialLoanLength - this.newLoanLength;
		$("#outputsavings").fadeIn("slow");
		$("#savings").text("$" + numberWithCommas(this.totalSavings.toFixed(2)));
		$("#monthssaved").text(this.totalMonthsSaved + " months ");
	}

}
