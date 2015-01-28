define( function ( require )  {
    var nodes = {};

    /**
     * time
     */
    // time-date
    var timeDate = require( 'time/date' );
    nodes.time_date = _get('time_date');
    nodes.time_date.innerHTML = timeDate('Y-m-d');

    // time-calc
    var timeCalc = require( 'time/calc' );
    nodes.time_calc = _get('time_calc');
    nodes.time_calc.innerHTML = 'Today is ' + timeDate( 'Y-m-d' ) + '. Tomorrow is ' + timeDate( 'Y-m-d', timeCalc( '+1day' ) ) +  '.';
});