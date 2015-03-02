define( function ( require ) {
    return function ( arr ) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    };
});