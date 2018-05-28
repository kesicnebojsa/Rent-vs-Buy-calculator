"use strick";

var housePrice, deposit, interestRate, yearsStaying;
function getInputValues() {
	housePrice = parseInt ( $('#rent_buy_button_2_slider_input_1').val() );
	deposit = parseInt ( $('#rent_buy_button_2_slider_input_2').val() );
	interestRate = parseFloat ( $('#rent_buy_button_2_slider_input_3').val() ) / 12 / 100;
	yearsStaying = parseInt ( $('#rent_buy_button_2_slider_input_4').val() );


	console.log(`inputs:`);
	console.log( housePrice );
	console.log( deposit );
	console.log( interestRate );
	console.log( yearsStaying );

}

var availableDeposit, totalLoan, mortgageRepayment;
var buyUpfront, buyCostOverTime, buyOpportunityCosts, buyEndCost;
var rentUpfront;
function calculate() {

	availableDeposit = deposit;  // - Stamp - transfer - govt
	totalLoan = housePrice + 6503 - availableDeposit;    // LMI fixed here?
	mortgageRepayment = ( totalLoan * interestRate * Math.pow( 1 + interestRate , 25*12) ) / ( Math.pow( 1 + interestRate , 25*12 ) - 1 );

	// Buy
	buyUpfront = deposit;
	buyCostOverTime = yearsStaying * ( (12 * mortgageRepayment) + 3119 + 0.01 * housePrice);
	buyOpportunityCosts = ( deposit * Math.pow( (1+0.04) , yearsStaying) ) - deposit + ( Math.pow((1+0.04),yearsStaying) + (3119 + 0.01*housePrice) * (1+0.04) * (( Math.pow( (1+0.04) , yearsStaying) - 1) / (0.04)) ) -
		                      (3119 + 0.01*housePrice)*7;
	buyEndCost = -( housePrice * Math.pow( (1+0.03) , yearsStaying) ) * (1 - 0.025) - ( -totalLoan * Math.pow( (1+interestRate) , yearsStaying*12) + mortgageRepayment * ( ( Math.pow( (1+interestRate) , yearsStaying*12) - 1) / interestRate) );

	console.log('buyEndCost: ', buyEndCost);




	// rent
	// rentUpfront = 52/12 * F18 / (yearsStaying * 52);

}





function writeResults() {

}



// ***   Input and Click Handlers   **** //

$('#rent_buy_button_2_slider_input_1').on("input", function(){
	$('#price_value').text( '$' + $(this).val() );
})
$('#rent_buy_button_2_slider_input_2').on("input", function(){
	$('#deposit_value').text( '$' + $(this).val() );
})
$('#rent_buy_button_2_slider_input_3').on("input", function(){
	$('#interest_value').text( $(this).val() + '%' );
})
$('#rent_buy_button_2_slider_input_4').on("input", function(){
	if ( parseInt ( $(this).val() ) < 2 ) {
		$('#years_value').text( $(this).val() + ' year' );
	}else {
		$('#years_value').text( $(this).val() + ' years' );		
	}
})






 $(function(){
 	getInputValues();
 	calculate();
 	writeResults();
 })

 $('input, select').on("change",function() {
 	getInputValues();
 	calculate();
 	writeResults();
 });