/**
 * 同Es6模板语法，经过一些小扩展(支持数组数据)
 */
define(function (require) {
    var reg = /\$\{([a-zA-Z\_\-0-9]+)\}/g;
    
    var tempStr = function (str, data) {
        var result;

        // 针对数组数据，则直接循环处理
        if (data instanceof Array) {
            var tmpArr = [];
            var i = 0,
                dataL = data.length,
                dataItem;

            for (; i < dataL; i++) {
                dataItem = data[i];
                tmpArr.push(this.tempStr(str, dataItem));
            }
            result = tmpArr.join('');
        }
        else {
            result = str.replace(reg, function (){
                var dateItem = data[arguments[1]];
                var ar = (typeof  dateItem == 'undefined' ) ? '' : dateItem;
                // 数据为数组时，拼合数组
                return (ar instanceof Array ? ar.join('') : ar);
            });
        }
        return result;
    };
    return tempStr;
});