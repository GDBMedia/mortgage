function Mortgage(decimalAge, time, balance, interest, monthly, MonthlyPayment, OGtime){
	this.decimalAge = decimalAge;
	this.time = time;
	this.balance = balance;
	this.interest = interest;
	this.monthly = monthly;
	this.newMonthlyPayment = MonthlyPayment;
	this.OGtime = OGtime;
}


$(function(){
	$("#submit").click(function(e){
		var balance = parseFloat($("#principal").val());
		var monthly = parseFloat($("#payment").val());
		var interest = parseFloat($("#irvalue").val());
		var age = $("#bday").val();
		if(errorCheck(balance, monthly, interest, age)){
			///donothing
		}
	
		else{
		var balanceOutput = numberWithCommas(balance);
		var monthlyOutput = numberWithCommas(monthly);
		var decimalAge = getAge(age);
		var exactAgeArray = getExactAge(decimalAge);
		var OGtime = getTime(balance, monthly, interest);
		var time = OGtime;
		var MonthlyPayment = getMonthlyPayment(balance, (interest/1200), (OGtime*12));
		var newMortgage = new Mortgage(decimalAge, time, balance, interest, monthly, MonthlyPayment, OGtime);
		var a = getExactAge(decimalAge+OGtime);
		sliderHandler(newMortgage);
		
		$("#initial").hide();
		$("#next").fadeIn("slow");
		$("#totalbalance").text("$"+balanceOutput);
		$("#currentPayment").text("$"+monthlyOutput);
		$("#interestRate").text(interest + "%");
		$("#finishedAge").text(a[0] + " Years and " + a[1] + " Months Old");
		
		
		}
		return false;
	});

	$("#paymentGroup").click(function(){
		$("#paymentGroup").removeClass("has-error");
	});

	$("#balanceGroup").click(function(){
		$("#balanceGroup").removeClass("has-error");
	});

	$("#interestGroup").click(function(){
		$("#interestGroup").removeClass("has-error");
	});

	$("#ageGroup").click(function(){
		$("#ageGroup").removeClass("has-error");
	});

	$("#reset").click(function(){
		location.reload();
	});

	$("#reset2").click(function(){
		location.reload();
	});

	$("#myform").submit(function(e){
	return false;
	});
	$('.carousel').each(function(){
			 $(this).carousel({
					 pause: true,
					 interval: false
			 });
	 });
	
    $(document).bind('keyup', function(e) {
        if(e.which == 39){
            $('.carousel').carousel('next');
        }
        else if(e.which == 37){
            $('.carousel').carousel('prev');
        }
    });


});
function errorCheck(balance, monthly, interest, age){
		if(!balance){
			$("#balanceGroup").addClass("has-error");
		}
		if(!monthly){
			$("#paymentGroup").addClass("has-error");
		}
		if(!interest){
			$("#interestGroup").addClass("has-error");
		}
		if(!age){
			$("#ageGroup").addClass("has-error");
		}
		if(monthly <= (balance*(interest/1200))){
			$("#paymentGroup").addClass("has-error");
		}
		else{
			return false;
		}
	return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getAge(age){
	var returnage = moment().diff(age, 'years', true);
	return returnage;
}
function sliderHandler(newMortgage){
	outputAgeSlider(newMortgage);
	outputPaymentSlider(newMortgage);
}
function outputAgeSlider(newMortgage){            
	$("#ageslider").html('<input id="ageS" data-slider-id="ageslider" type="number" data-slider-tooltip="hide" class="inputs" data-slider-min="' + newMortgage.decimalAge + '" data-slider-max="' + (newMortgage.decimalAge + newMortgage.OGtime) + '" data-slider-step=".083333333" data-slider-value="'+(newMortgage.decimalAge + newMortgage.time)+'"/>');
		$('#ageS').slider({
		formatter: function(value) {
			var a = getExactAge(value);
			
			$("#years").text(a[0]);
			$("#months").text(a[1]);	
		}
		});
		$('#ageS').on("slide", function(slideEvt){
			newMortgage.newMonthlyPayment = getMonthlyPayment(newMortgage.balance, (newMortgage.interest/1200), ((slideEvt.value-newMortgage.decimalAge)*12));
			update(1, newMortgage);
		});

}
function outputPaymentSlider(newMortgage){
		$("#paymentslider").html('<input id="paymentS" data-slider-id="paymentSlider" type="number" data-slider-tooltip="hide" class="inputs" data-slider-min="' + newMortgage.monthly + '" data-slider-max="10000" data-slider-step=".01" data-slider-value="' + newMortgage.newMonthlyPayment +'"/>');
		$('#paymentS').slider({
		formatter: function(value) {
			var Payments = value;
			$("#paymentoutput").text("$"+Payments);
		}

		});
		$('#paymentS').on("slide", function(slideEvt){
			newMortgage.time = getTime(newMortgage.balance, slideEvt.value, newMortgage.interest);
			update(2, newMortgage);
		});

}
function update(flag,newMortgage){
	switch(flag){
		case 1:
			outputPaymentSlider(newMortgage);
			break;
		case 2: 
			outputAgeSlider(newMortgage);
			break;
		default:
			console.log("failed slider Update");
	}
}
function getExactAge(value){
	var arrayExactAge = [];
	var theirage = value
	var str=theirage.toString();
	var numarray=str.split('.');
	var a=new Array();
	a=numarray;
	if(!a[1]){
		a[1] = 0;
	}
	var months = parseFloat("."+a[1]);
	var month= months*12;
	var monthstr=month.toString();
	var montharray=monthstr.split('.');
	var b=new Array();
	b=montharray;
	arrayExactAge[0] = a[0];
	arrayExactAge[1] = b[0];	

	return arrayExactAge;

}
function getMonthlyPayment(balance, interest, time){
		var returnValue = (balance * interest * (Math.pow(1 + interest, time)) / (Math.pow(1 + interest, time) - 1));
		return returnValue;
	}
// function getExactAge(age){
// 	var arrayExactAge = [];
// 	var theirage = getAge(age);
// 	var str=theirage.toString();
// 	var numarray=str.split('.');
// 	var a=new Array();
// 	a=numarray;
// 	if(!a[1]){
// 		a[1] = 0;
// 	}
// 	var months = parseFloat("."+a[1]);
// 	var month= months*12;
// 	var monthstr=month.toString();
// 	var montharray=monthstr.split('.');
// 	var b=new Array();
// 	b=montharray;
// 	arrayExactAge[0] = a[0];
// 	arrayExactAge[1] = b[0];	

// 	return arrayExactAge;

// }
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
		// console.log(B);
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
		this.monthlyPayment = this.setMonthlyPayment();
		this.row = new Float64Array(4);//// 1-dimmenisonal 7 values, then new row
		this.table = this.tableGenerator();
	}
	getMonthlyPayment(){
		console.log(this.monthlyPayment);
		return this.monthlyPayment;
	}
	//monthly payment , interestpaid, priniciapl paid, remaining balance-=principal paid, total interest, total principal, total paid 
	setMonthlyPayment(){
		var returnValue = (this.principal * this.interest * (Math.pow(1 + this.interest, this.time)) / (Math.pow(1 + this.interest, this.time) - 1));
		return returnValue;
	}
	 tableGenerator(){
	 	var table = [];
		var interestRate = this.interest;
		var payment = this.monthlyPayment;
		var balance = this.balance;
		var interestPaid= 0;
		var principalPaid = 0;
		var row = new Float64Array(4);

		for(var i=0; balance>0.001; i++){
			interestPaid = balance * interestRate;
			principalPaid = payment - interestPaid;
			balance-=principalPaid;
			row[0]= payment.toFixed(2);
			row[1]=interestPaid.toFixed(2);
			row[2]=principalPaid.toFixed(2);
			row[3]=balance.toFixed(2);
			console.log(row);
			table.push(row);
		}
		console.log(table.length);
		return table;
	}
	ageAdjustor(age){
		var currentbalance = this.table[age];
		console.log(currentbalance);
		return currentbalance[3];
	}
	getTimeMortgage(){
		return this.table.length;
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
