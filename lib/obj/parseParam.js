/**
 * 合并参数，以第一个对象为基准，同名覆盖，新增忽略，不影响源
 */
define(['../extra/isType'], function (isType) {
    return function (rootObj, newObj, isNumParse) {
        var tempObj = {};
        newObj = isType( newObj, 'object' ) ? newObj : {};
        for ( var i in rootObj ) {
            tempObj[i] = rootObj[i];
            if ( i in newObj ) {
                var temp = newObj[i];
                var parseVal = parseFloat(temp);
                if ( isNumParse && !isNaN( parseVal ) ) {
                    temp = parseVal;
                }
                tempObj[i] = temp;
            }
        }
        return tempObj;
    };
});