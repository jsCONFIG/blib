requirejs.config({
    baseUrl: 'lib',
    map: {
      '*': {
        'css': 'require-css' // or whatever the path to require-css is
      }
    },
    paths: {
        'require-css': 'css.min'
    }
});

requirejs(['app-calendar', 'require-css'], function (calendar) {
    window.console && console.log('calendar');
});