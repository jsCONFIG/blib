/**
 * date方法，功能接近于php的date方法
 * @return {[type]}        [description]
 */
define( function () {
    var date = function( formateStr, dateObj ) {
        var dObj = (dateObj && dateObj.constructor == Date) ? dateObj : (new Date());

        formateStr = formateStr || 'Y-m-d H:i:s';

        var dStr    = '',
            year    = dObj.getFullYear(),
            month   = dObj.getMonth() + 1,
            date    = dObj.getDate(),
            hours   = dObj.getHours(),
            minutes = dObj.getMinutes(),
            seconds = dObj.getSeconds(),
            yearStr = year.toString(),
            monthStr= month.toString(),
            dateStr = date.toString(),
            hoursStr= hours.toString(),
            minuStr = minutes.toString(),
            secStr  = seconds.toString();

        for( var i = 0, fL = formateStr.length; i < fL; i++ ) {
            var flag = formateStr.charAt( i );

            switch( flag ) {
                /**
                 * 年
                 */
                // 四位完整年数，如:"2014"
                case 'Y':
                    dStr += yearStr;
                    break;

                // 两位年数，如14
                case 'y':
                    dStr += yearStr.slice( yearStr.length - 2 );;
                    break;

                /**
                 * 月
                 */
                // 有前导0的月数，eg. "01"
                case 'm':
                    dStr += (monthStr.length < 2 ? ('0' + monthStr) : monthStr);
                    break;

                // 无前导0的月数
                case 'n':
                    dStr += monthStr;
                    break;

                /**
                 * 日
                 */
                // 有前导0的日数
                case 'd':
                    dStr += (dateStr.length < 2 ? ('0' + dateStr) : dateStr);
                    break;

                // 无前导0的日数
                case 'j':
                    dStr += dateStr;
                    break;

                /**
                 * 时间
                 */
                // 12小时制，无前导0
                case 'g':
                    dStr += (hours % 12);
                    break;

                // 24小时制，无前导0
                case 'G':
                    dStr += hours;
                    break;

                // 12小时制，有前导0
                case 'h':
                    var hTmp = (hours % 12).toString();
                    dStr += (hTmp.length < 2 ? ('0' + hTmp) : hTmp);
                    break;

                // 24小时制，有前导0
                case 'H':
                    dStr += (hoursStr.length < 2 ? ('0' + hoursStr) : hoursStr);
                    break;

                // 带前导0的分钟
                case 'i':
                    dStr += (minuStr.length < 2 ? ('0' + minuStr) : minuStr);
                    break;

                // 带前导0的秒钟
                case 's':
                    dStr += (secStr.length < 2 ? ('0' + secStr) : secStr);
                    break;

                // 其它情况直接相加
                default:
                    dStr += flag;
            }
        }

        return dStr;
    };

    return date;
});