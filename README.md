blib
====

js基础工具集(Basic toolset for Javascript.)

###概要

  1). time/xx-与时间相关的处理
  
  2). data/xx-与数据相关的处理

###详情列表
  > 示例中的变量已放在全局的vars变量中，可在控制台中进行相关操作，所有示例都可已在仓库中的blib.html中实现，可自行摘取自己需要的工具

  time/date-类似php中的date方法

    var date = require( 'time/date' );
    console.log( date('Y-m-d') );

  time/calc-时间的简单运算，支持year, month, week, day, hours, minutes, seconds

    var timeCalc = require( 'time/calc' );
    console.log( 'Today is ' + timeDate( 'Y-m-d' ) + 
		'. Tomorrow is ' + timeDate( 'Y-m-d', timeCalc( '+1day' ) ) );

  data/database-数据管理，支持主键，索引创建，以及常规的增删改查
  > 注：索引的使用会带来额外的存储资源的消耗，同时在改动数据时，会带来额外的更新索引表的消耗，因此，索引适用于大量数据且改动不频繁的情况，少量数据则无需使用索引，以99999条数据做测试，查找第89999条项目中的数据，database消耗时间在 0.170ms左右，传统的循环遍历查找消耗时长在 202.232ms 左右，速度提示大概一千多倍，效果还是很明显。


    var dataDatabase = require( 'data/database' );
	
	// 创建主键及索引列表，主键可不填<代码自动生成>
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
