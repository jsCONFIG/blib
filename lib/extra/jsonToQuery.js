define(function (require) {
    return function (obj, isEncode) {
        var str = '';
        var temp = [];
        for (var i in obj) {
            var tempV = obj[i].toString();
            if ( isEncode ) {
                i = encodeURIComponent( i );
                tempV = encodeURIComponent( tempV );
            }
            temp[ temp.length ] = ( i + '=' + tempV );
            temp[ temp.length ] = ( '&' );
        }
        temp.pop(); // 弹出最后一个&
        str = temp.join('');
        return str;
    };
});