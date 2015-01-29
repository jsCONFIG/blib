blib
====

js基础工具集(Basic toolset for Javascript.)

###概要

  1). time/xx-与时间相关的处理

###详情列表

  time/date-类似php中的date方法

    var date = require( 'time/date' );
    console.log( date('Y-m-d') );

  time/calc-时间的简单运算，支持year, month, week, day, hours, minutes, seconds

    var date = require( 'time/calc' );
    console.log( 'Today is ' + timeDate( 'Y-m-d' ) + '. Tomorrow is ' + timeDate( 'Y-m-d', timeCalc( '+1day' ) ) );