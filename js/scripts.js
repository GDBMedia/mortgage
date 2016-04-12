$(function(){
	var balance = $("principal").val();
	var monthly = $("payment").val();
	var intrest = $("irvalue").val();
	var monthly = $("payment").val();
	var ageIvalue = 0;
	var ageAvalue = 0;
	var irvalue = 0;
$('#age').slider({
	formatter: function(value) {
		ageIvalue = value;
		$("#ageIvalue").text(ageIvalue);
		//this how you output slider value
		$("#retire").html('<div class="form-group"><label for="points">Desired Age of Final Payment:</label><br><input id="ageA" data-slider-id="ageAslider" type="text" data-slider-tooltip="hide" class="inputs" data-slider-min="' + (ageIvalue + 1) + '" data-slider-max="80" data-slider-step="1" data-slider-value="' + ageAvalue + '"/><h2 id="ageAvalue" class="pull-right"></h2></div>');
		$("#ageA").slider({
			formatter: function(value) {
			ageAvalue = value;
			$("#ageAvalue").text(ageAvalue);
	}
});
	}
});

$('#ir').slider({
	formatter: function(value) {
		$("#irvalue").val(value+"%");
	}
});





})




