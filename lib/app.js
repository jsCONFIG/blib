define( function ( require )  {
    var nodes = {};
    var date = require( 'time/date' );

    /**
     * time
     */
    // time-date
    nodes.time_date = _get('time_date');
    nodes.time_date.innerHTML = date('Y-m-d');
});