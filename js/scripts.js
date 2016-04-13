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
	var age = parseInt($("#agevalue").val())
	var years = getTime(balance, monthly, interest);
	$("#output").text("Age of Final Payment: " + (age + years));
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