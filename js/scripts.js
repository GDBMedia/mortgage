$(function(){
	var ageIvalue = 0;
	var ageAvalue = 0;
	var irvalue = 0;
$('#ageI').slider({
	formatter: function(value) {
		ageIvalue = value;
		$("#ageIvalue").text(ageIvalue);
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
		irvalue = value;
		$("#irvalue").text(irvalue+"%");
	}
});





})




