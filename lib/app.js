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

    var dataDatabase = require( 'data/database' );
    window.data = new dataDatabase({primary:'uid', idx:['name', 'age']});
    data.create({uid:1,name:'lp1' , age:'age1'});
    data.create({uid:2,name:'lp2' , age:'age2'});
    data.create({uid:3,name:'lp3' , age:'age3'});
    data.create({uid:4,name:'lp3' , age:'age3', addr:'add4'});
});