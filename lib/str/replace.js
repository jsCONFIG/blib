define(function (require) {
    return function (str, data) {
        var reg = /\#\{([a-zA-Z\_\-0-9]+)\}/g;
        var result = str.replace(reg, function (){
            var ar = (typeof data[arguments[1]] == 'undefined' ) ? '' : data[arguments[1]];
            return ar;
        });
        return result;
    };
});