define(function (require){
    var reg = /([^\?&\&]+)/g;

    return function (str) {
        if( str == undefined ) {
            return {};
        }
        var temp = str.match( reg );
        var resultObj = {};
        for( var i = 0; i < temp.length; i++ ) {
            var str = temp[i];
            var strArr = str.split( '=' );
            if( strArr.length >= 2 ) {
                resultObj[ strArr[0] ] = strArr[1];
            }
        }
        return resultObj;
    };
});