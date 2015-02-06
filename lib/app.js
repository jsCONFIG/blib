define( function ( require )  {
    var nodes = {};

    var vars = {};
    window.vars = vars;

    /**
     * time
     */
    // time-date
    var timeDate = require( 'time/date' );
    nodes.time_date = _get('time_date');
    nodes.time_date.innerHTML = timeDate('Y-m-d');
    vars.timeDate = timeDate;

    // time-calc
    var timeCalc = require( 'time/calc' );
    nodes.time_calc = _get('time_calc');
    nodes.time_calc.innerHTML = 'Today is ' + timeDate( 'Y-m-d' ) + '. Tomorrow is ' + timeDate( 'Y-m-d', timeCalc( '+1day' ) ) +  '.';
    vars.timeCalc = timeCalc;

    // data-database
    var dataDatabase = require( 'data/database' );
    var myData = new dataDatabase({'primary' : 'id', 'idx' : ['name', 'age']});
    myData.create({ 'id' : 1, 'name' : 'BottleLiu1', 'age' : 24 });
    myData.create({ 'id' : 2, 'name' : 'BottleLiu2', 'age' : 24, 'from' : 'China' });

    var data_databaseGetStr = '' +
        _stringfy(myData.get( { 'name' : 'BottleLiu1' } )) + '<br>' +
        _stringfy( myData.get( { 'id' : '1' } ) ) + '<br>' +
        _stringfy( myData.get( { 'age' : 24 } ) ) + '<br>' +
        _stringfy( myData.get( { 'age' : 24, 'from' : 'China' } ) ) + '<br><br>';

    myData.update( { 'age' : 24 }, { 'name' : 'bottle' } );
    var data_databaseUpStr = _stringfy( myData.get( { 'age' : 24 } ) ) + '<br><br>';

    myData.del( { 'id' : 1} );
    var data_databaseDelStr = _stringfy( myData.get( { 'age' : 24 } ) ) + '<br><br>';


    nodes.data_database = _get('data_database');
    nodes.data_database.innerHTML = data_databaseGetStr + data_databaseUpStr + data_databaseDelStr;

    vars.dataDatabase = dataDatabase;
    vars.myData = myData;
});