/**
 * 提供日历的相关判断
 */
define(function (require, exports, module) {
    // 月天数map
    var monthDayNumMap = [
        31, 28, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
    ];

    // 辅助获取可量化的星期
    var weekMap = {Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7};

    var LanMap = {
        zh: {
            date: ['年', '月', '日'],
            weekShort: ['一', '二', '三', '四', '五', '六', '日'],
            week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        en: {
            date: ['Year', 'Month', 'Day'],
            weekShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    };

    // 闰年判断
    exports.isLeapYear = function (numberYear) {
        return !(numberYear % 4) && (numberYear % 100) || !(numberYear % 400);
    };

    // 获取每个月的日期数
    exports.monthNum = function (month, year) {
        month = parseInt(month, 10);
        if (month !== 2) {
            return monthDayNumMap[month + 1];
        }
        return this.isLeapYear(year) ? 28 : 29;
    };

    // 获取周几，绘制日历时，建议只获取每月第一天，之后的做+1判断
    exports.getWeek = function (day, month, year) {
        var date;
        if (day instanceof Date) {
            date = day;
        }
        else {
            date = new Date();
            date.setFullYear(year, month - 1, day);
        }
        var DateStr = date.toDateString();
        return weekMap[DateStr.split(' ')[0]];
    };
});