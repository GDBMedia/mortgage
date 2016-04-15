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
		var balance = parseFloat($("#balance").val());
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

			$("#confirm").click(function(e){
				$('#myModal').modal('show');
				$("#OGbalance").text(numberWithCommas(balance));
				$("#OGmonthly").text(numberWithCommas(monthly));
				$("#OGyears").text(a[0] + " years");
				$("#OGmonths").text(a[1] + " months");
				$("#newYear").text($("#years").text() + " years");
				$("#newMonth").text($("#months").text() + " months");
				var newPayS = $("#paymentoutput").text();
				var newPay = parseFloat(removeAll(newPayS));
				console.log(newPay);
				console.log(monthly);
				var payDiff = newPay - monthly;
				$("#payDiff").text(numberWithCommas(payDiff.toFixed(2)));
				return false;
			});

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
function removeAll(x){
	x = x.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
	return x;
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
	$("#paymentslider").html('<input id="paymentS" data-slider-id="paymentSlider" type="number" data-slider-tooltip="hide" class="inputs" data-slider-min="' + newMortgage.monthly + '" data-slider-max="15000" data-slider-step=".01" data-slider-value="' + newMortgage.newMonthlyPayment +'"/>');
	$('#paymentS').slider({
		formatter: function(value) {
			var Payments = value;
			$("#paymentoutput").text("$"+numberWithCommas(Payments.toFixed(2)));
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
