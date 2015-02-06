blib
====

js基础工具集(Basic toolset for Javascript.)

###概要

  1). time/xx-与时间相关的处理
  
  2). data/xx-与数据相关的处理

###详情列表
  > 示例中的变量已放在全局的vars变量中，可在控制台中进行相关操作

  time/date-类似php中的date方法

    var date = require( 'time/date' );
    console.log( date('Y-m-d') );

  time/calc-时间的简单运算，支持year, month, week, day, hours, minutes, seconds

    var timeCalc = require( 'time/calc' );
    console.log( 'Today is ' + timeDate( 'Y-m-d' ) + 
		'. Tomorrow is ' + timeDate( 'Y-m-d', timeCalc( '+1day' ) ) );

  data/database-数据管理，支持主键，索引创建，以及常规的增删改查

    var dataDatabase = require( 'data/database' );
	var myData = new dataDatabase({'primary' : 'id', 'idx' : ['name', 'age']});
	
	// 增
	myData.create({ 'id' : 1, 'name' : 'BottleLiu1', 'age' : 24 });
	myData.create({ 'id' : 2, 'name' : 'BottleLiu2', 'age' : 24, 'from' : 'China' });
	
	// 查
	console.log( myData.get( { 'name' : 'BottleLiu1' } ) );
	console.log( myData.get( { 'id' : '1' } ) );
	console.log( myData.get( { 'age' : 24 } ) );
	console.log( myData.get( { 'age' : 24, 'from' : 'China' } ) );
	
	// 改
	myData.update( { 'age' : 24 }, { 'name' : 'bottle' } );
	console.log( myData.get( { 'age' : 24 } ) );
	
	// 删
	myData.del( { 'id' : 1} );
	console.log( myData.get( { 'age' : 24 } ) );
