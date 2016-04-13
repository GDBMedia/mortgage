$(function(){
	var ageIvalue = 0;
	var ageAvalue = 0;
	var irvalue = 0;
$('#age').slider({
	formatter: function(value) {
		$("#agevalue").val(value);
		
		ageIvalue = value;
		
		// $("#ageIvalue").text(ageIvalue);
		//this how you output slider value
// 		$("#retire").html('<div class="form-group"><label for="points">Desired Age of Final Payment:</label><br><input id="ageA" data-slider-id="ageAslider" type="text" data-slider-tooltip="hide" class="inputs" data-slider-min="' + (ageIvalue + 1) + '" data-slider-max="80" data-slider-step="1" data-slider-value="' + ageAvalue + '"/><h2 id="ageAvalue" class="pull-right"></h2></div>');
// 		$("#ageA").slider({
// 			formatter: function(value) {
// 			ageAvalue = value;
// 			$("#ageAvalue").text(ageAvalue);
// 	}
// });
	}
});
$("#submit").click(function(e){
	var balance = parseFloat($("#principal").val());
	var monthly = parseFloat($("#payment").val());
	var interest = parseFloat($("#irvalue").val());
	var age = parseInt($("#agevalue").val());
	var example = new AmortizationTable("400000","3.5","30");
	// example.getMonthlyPayment();
	// example.tableGenerator();
	// var years = getTime(balance, monthly, interest);
	// $("#output").text("Age of Final Payment: " + (age + years));
	return false;
});



});
function getTime(balance, monthly, interest){
	// debugger;
	var B = balance;
	var Pay = monthly;
	var I = (interest/1200);
	var BI = 0;
	var Prin = 0;
	var N = 0;
	while(B > 0){
		BI = B * I;
		Prin = Pay - BI;
		B -= Prin;
		N++;
		console.log(B);
	}
	return (N/12);
}
///ACTUAL LOGIC 
class AmortizationTable{
	constructor(principal, interest, time){
		this.principal = parseFloat(principal);
		this.balance = this.principal;
		this.interest = parseFloat(interest)/1200; /// inputed as APR, converted to monthly rate
		this.time = parseFloat(time)*12; //inputed as years so months 
		this.monthlyPayment = (this.principal * this.interest * (Math.pow(1 + this.interest, this.time)) / (Math.pow(1 + this.interest, this.time) - 1));
		this.row = new Float64Array(4);//// 1-dimmenisonal 7 values, then new row
		this.table = this.tableGenerator();
	}
	getMonthlyPayment(){
		console.log(this.monthlyPayment);
		return this.monthlyPayment;
	}
	//monthly payment , interestpaid, priniciapl paid, remaining balance-=principal paid, total interest, total principal, total paid 
	
	 tableGenerator(){
	 	var table = [];
		var interestRate = this.interest;
		var payment = this.monthlyPayment;
		var balance = this.balance;
		var interestPaid= 0;
		var principalPaid = 0;

		for(var i=0; balance>0; i++){
			interestPaid = balance * interestRate;
			principalPaid = payment - interestPaid;
			balance-=principalPaid;
			this.row[0]= payment.toFixed(2);
			this.row[1]=interestPaid.toFixed(2);
			this.row[2]=principalPaid.toFixed(2);
			this.row[3]=balance.toFixed(2);
			console.log(this.row);
			table.push(this.row);
		}
		console.log(table.length);
		return table;
	}
	ageAdjustor(age){


	}
}
		// ////FIRST TABLE ROW
		// this.row[0]=this.monthlyPayment;
		// this.row[1]=(this.balance*this.row[0]);//interest=balance*monthly interest
		// this.row[2]=(this.row[0]-this.row[1]);//remaining balance-=principal paid
		// this.row[3]=(this.row[3]-this.row[2]);//balance-=principalPaid
		// this.row[4]=this.row[3];//†otalinterestpaid+=interest
		// this.row[5]=this.row[2];//totalprincipalpaid+=principal
		// this.row[6]=(this.row[3]+this.row[2]);//totalpaid=†otalinterestpaid+totalprincipalpaid
		// // while(this.row[3]>0)
		// for(var i=1; i<this.time; i+=7){
		// 		this.row[0+i]=this.row[0];//NEED TO EDIT this.row[0]
		// 		this.row[1+i]=(this.row[i-5]*this.row[0]);//interest=balance*monthly interest
		// 		this.row[2+i]=(this.row[0]-this.row[1+i]);//NEED TO EDIT this.row[0]
		// 		this.row[3+i]=(this.row[i-7]-this.row[i-5]);//balance-=principalPaid
		// 		this.row[4+i]=this.row[3];//†otalinterestpaid+=interest
		// 		this.row[5+i]=this.row[2];//totalprincipalpaid+=principal
		// 		this.row[6+i]=this.row[3]+this.row[2];//totalpaid=†otalinterestpaid+totalprincipalpaid
		// 		// if(this.row[3]<)
		// 	}
		// }
	// }
	// [0 = monthlyPayment], [1 = remainingBlance*monthlyinterest], [2 = monthlyPayment- [1]]
