var _get = function ( id ) {
    return document.getElementById( id );
};

var _stringfy = function ( obj ) {
    return window.JSON ? JSON.stringify( obj ) : ( obj + '' );
}
requirejs.config({
    baseUrl: 'lib'
});

requirejs(['app'], function ( app ) {
    window.console && console.log('ok');
});