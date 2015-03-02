define( function ( require ) {
    var isType = require( 'array.isArray' );

    var indexof = function (item, arr) {
        if (!this.isArray(arr)) {
            return false;
        }
        if (typeof arr.indexOf != 'undefined') {
            indexof = function (otherItem, otherArr) {
                return otherArr.indexOf(otherItem);
            };
        } else {
            indexof = function (otherItem, otherArr) {
                var index = -1;
                for (var i = 0; i < otherArr.length; i++) {
                    if (otherArr[i] === otherItem) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        }
        return indexof(item, arr);
    };

    return indexof;
});