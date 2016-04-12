$(function(){
	var agevalue = 0;
	var irvalue = 0;
$('#age').slider({
	formatter: function(value) {
		agevalue = value;
		$("#agevalue").text(agevalue);
	}
});
$('#ir').slider({
	formatter: function(value) {
		irvalue = value;
		$("#irvalue").text(irvalue);
	}
});
console.log(agevalue);
console.log(irvalue);



$('.carousel').each(function(){
			 $(this).carousel({
					 pause: true,
					 interval: false
			 });
	 });

})
