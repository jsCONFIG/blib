/**
 * 日期的简单计算
 * 支持year, month, week, day, hours, minutes, seconds
 * @return {[type]}         [description]
 */
define( function ( require ) {
    var reg = /^(\+|\-)(\d+)([a-zA-Z]+)$/;
    var calc = function ( offsetStr, date ) {
        offsetStr = offsetStr || '';
        date = (date && date.constructor == Date) ? date : (new Date());

        // 单位 s
        var keyword = {
            'year'      : 'year',
            'month'     : 'month',
            'week'      : 7 * 24 * 3600,
            'day'       : 1 * 24 * 3600,
            'hours'     : 3600,
            'minutes'   : 60,
            'seconds'   : 1
        };

        var matchArr = offsetStr.match( reg );
        if( !matchArr ) {
            return date;
        }

        var offsetNum = parseFloat( matchArr[2] ),
            offsetSym = matchArr[1] == '+' ? 1 : -1,
            offsetStep = keyword[ matchArr[3].toLowerCase() ];

        if( !offsetStep ) {
            return date;
        }

        var result = date;

        // 对月份和年份做特殊处理，其它做统一处理
        if( typeof offsetStep == 'string' ) {
            switch ( offsetStep ) {
                case 'year':
                    var tmpY = date.getFullYear();
                    tmpY += (offsetSym * offsetNum);
                    date.setFullYear( tmpY );
                    break;

                case 'month':
                    var tmpM = date.getMonth();

                    // 计算所加的月份数是否凑够一年
                    var yearRound = Math.floor( (tmpM + offsetNum) / 12 );
                    if( yearRound ) {
                        var tmpY = date.getFullYear();
                        tmpY += (offsetSym * yearRound);
                        date.setFullYear( tmpY );
                    }

                    date.setMonth( tmpM + offsetSym * (offsetNum % 12) );
                    break;
                default:
                    result = false;
            }
        }
        else {
            // 得到毫秒数
            date = +date;

            date += (offsetSym * offsetNum * offsetStep * 1000);

            result = new Date( date );
        }

        return result;
    };

    return calc;
});