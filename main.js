var _get = function ( id ) {
    return document.getElementById( id );
};
requirejs.config({
    baseUrl: 'lib'
});

requirejs(['app'], function ( app ) {
    window.console && console.log('ok');
});