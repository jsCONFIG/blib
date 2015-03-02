define( function ( require ) {
    var toArr = function ( likeArr, offset ) {
        return Array.prototype.slice.call( likeArr, offset || 0 );
    };

    return toArr;
});