define( function ( require ) {
    return function ( len ) {
        var l = (typeof len == 'number') ? len : 16;
        var result = '';
        for( ; result.length < l; result += Math.random().toString(36).substr(2) );
        return result.substr( 0, l );
    };
});