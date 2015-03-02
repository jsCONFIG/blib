/**
 * 类型检测
 * @return {Boolean}
 */
define( function ( require ) {
    return function ( v, type ) {
        var typeV = ( typeof v );
        if ( typeV == 'undefined' ) {
            return /^undefined$/i.test( type );
        }
        else{
            var reg = new RegExp( type, 'gi' );
            try {
                var transStr = v.constructor.toString();
                return reg.test( transStr );
            }
            catch(NULL){
                return ( /^object$/i.test( typeV ) && /^null$/i.test( type ) );
            }
        }
    };
});