/**
 * 日历主逻辑js
 */
define(function (require, exports, module) {
    var calendarBase = require('./calendar-base'),
        dateParse = require('./dateParse'),
        dateFormate = require('./date'),
        parseParam = require('obj/parse-param'),
        tempStr = require('str/tempStr');

    require('css!./calendar');

    var TEMP = {
        LAYOUT: ['',
            '<div class="bcalendar-inner">',
                '<div class="bcalendar-header">${header}</div>',
                '<div class="bcalendar-week">${weekList}</div>',
                '<div class="bcalendar-day">${dayList}</div>',
                '<div class="bcalendar-footer">${footer}</div>',
            '</div>'].join(''),
        HEADER: ['',
            '<span class="bcal-btn bcal-align-left bcal-minus-year">${minusYear}</span>',
            '<span class="bcal-btn bcal-align-left bcal-minus-month">${minusMonth}</span>',
            '<span class="bcal-pannel bcal-time">${time}</span>',
            '<span class="bcal-btn bcal-align-right bcal-plus-month">${plusMonth}</span>',
            '<span class="bcal-btn bcal-align-right bcal-plus-year">${plusYear}</span>'].join(''),

        WEEK_WRAPPER: '<div class="bcal-week-list">${listHtml}</div>',

        WEEK: '<span class="bcal-item bcal-week ${status}">${val}</span>',

        DAY: '<span class="bcal-item bcal-day ${status}">${val}</span>'
    };

    var langMap = calendarBase.lanMap;

    var render = {
        layout: function (data) {
            var wrapper = document.createElement('div');
            wrapper.className = 'bcalendar-wrapper';
            var htmlStr = tempStr(TEMP.LAYOUT, data);
            wrapper.innerHTML = htmlStr;
            return wrapper;
        },

        header: function (hParam) {
            var param = parseParam({
                minusYear: '&lt;',
                minusMonth: '&lt;&lt;',
                plusMonth: '&gt;&gt;',
                plusYear: '&gt;'
            }, hParam);

            var htmlStr = tempStr(TEMP.HEADER, param);

            return htmlStr;
        },

        // 渲染星期标题
        weekList: function (lang, isLong) {
            var langData = (typeof lang === 'string' ? (langMap[lang || 'zh'] || langMap['zh']) : lang);
            langData = langData['week' + (isLong ? '' : 'Short')];
            var tempData = [];
            var i = 0,
                langItem,
                wL = langData.length;

            for (; i < wL; i++) {
                // 按照周日到周六的顺序
                langItem = {
                    val: langData[i],
                    status: i < 5 ? '' : 'week'
                };
                tempData[i === 6 ? 'unshift' : 'push'](langItem);
            }

            var listHtml = tempStr(TEMP.WEEK, tempData);
            listHtml = tempStr(TEMP.WEEK_WRAPPER, {
                listHtml: listHtml
            });

            return listHtml;
        },

        // 渲染所有日期
        // [{val: 31, status: 'prev'}, {val: 1, status: ''}, {val: 2, status: 'current'}, ..., {val: 1, status: 'next'}]
        dayList: function (dayData) {
            var dayListHtml = tempStr(TEMP.DAY, dayData);
            return dayListHtml;
        }
    };

    var dataConverters = {
        day: function (month, year, currentDay) {
            var dayNum = calendarBase.monthNum(month, year),
                startDayWeek = calendarBase.getWeek(1, month, year),
                lastDayWeek = calendarBase.getWeek(dayNum, month, year);

            var dayData = [],
                dayVal;

            for (var i = 0; i < dayNum; i++) {
                dayVal = i + 1;
                dayData.push({
                    val: dayVal,
                    status: currentDay === dayVal ? '' : 'current'
                });
            }

            // 补齐之前的数据
            var prevOffset = startDayWeek % 7;
            if (prevOffset) {
                var prevMonth = month - 1,
                    isFirstMonth = prevMonth <= 0;
                prevMonth = isFirstMonth ? 12 : prevMonth;
                var prevYear = isFirstMonth ? (year - 1) : year;

                var prevMonthDayNum = calendarBase.monthNum(prevMonth, prevYear),
                    prevDayBorder = prevMonthDayNum - prevOffset;

                for (; prevMonthDayNum > prevDayBorder; prevMonthDayNum--) {
                    dayData.unshift({
                        val: prevMonthDayNum,
                        status: 'prev'
                    });
                }
            }

            // 补齐之后的数据
            var nextOffset = (7 - (lastDayWeek + 1) % 7) % 7;
            if (nextOffset) {
                var nextMonth = month + 1,
                    isLastMonth = nextMonth > 12;

                nextMonth = isLastMonth ? 1 : nextMonth;
                var nextYear = isLastMonth ? (year + 1) : year;

                var i = 1,
                    nextDayBorder = nextOffset;

                for (; i <= nextDayBorder; i++) {
                    dayData.push({
                        val: i,
                        status: 'next'
                    });
                }
            }

            return dayData;
        }
    };

    var domTools = {
        getByClass: function (className, root) {
            var tempNode;
            if (root.querySelectorAll) {
                tempNode = root.querySelectorAll('.' + className);
            }
            else if (root.getElementsByClassName) {
                tempNode = root.getElementsByClassName(className);
            }
            else {
                var nodes = root.getElementsByTagName('*');
                for (var i = 0; i < nodes.length; i++) {
                    var attrVal = nodes[i].className;
                    if (attrVal == val) {
                        tempNode.push(nodes[i]);
                    }
                }
            }
            return tempNode;
        }
    };

    var buildCalendar = function (date, options) {
        var opts = parseParam({
            lang: 'zh',
            isLong: false,
            hParam: undefined,
            valFormate: 'Y-m-d'
        }, options);
        date = date || new Date();

        var dateObj = dateParse(date);
        var dayData = dataConverters.day(dateObj.month, dateObj.year, dateObj.day);
        var dayHtml = render.dayList(dayData),
            weekHtml = render.weekList(opts.lang, opts.isLong),
            headHtml = render.header(opts.hParam);

        var calendarNd = render.layout({
            header: headHtml,
            weekList: weekHtml,
            dayList: dayHtml
        });
        
        var valPannel = domTools.getByClass('bcal-time', calendarNd);
        valPannel[0].innerHTML = dateFormate(opts.valFormate, date);

        return calendarNd;
    };

    exports.build = buildCalendar;
});