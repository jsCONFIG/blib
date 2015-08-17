/**
 * date方法，功能接近于php的date方法
 * @return {[type]}        [description]
 */
define( function () {
    var dateFormateReg = /Y|y|m|n|d|j|g|G|h|H|i|s/g;

    var date = function (formateStr, dateObj) {
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
            secStr  = seconds.toString(),
            gHousr = (hours % 12).toString();

        var dateKeyMap = {
            Y: yearStr,
            y: yearStr.slice( yearStr.length - 2 ),
            m: (monthStr.length < 2 ? ('0' + monthStr) : monthStr),
            n: monthStr,
            d: (dateStr.length < 2 ? ('0' + dateStr) : dateStr),
            j: dateStr,
            g: gHousr,
            G: hours,
            h: (gHousr.length < 2 ? ('0' + gHousr) : gHousr),
            H: (hoursStr.length < 2 ? ('0' + hoursStr) : hoursStr),
            i: (minuStr.length < 2 ? ('0' + minuStr) : minuStr),
            s: (secStr.length < 2 ? ('0' + secStr) : secStr)
        };

        dStr = formateStr.replace(dateFormateReg, function (matchItem){
            var ar = (typeof dateKeyMap[matchItem] === 'undefined') ? matchItem : dateKeyMap[matchItem];
            return ar;
        });

        return dStr;
    };

    return date;
});