define(function (require, exports, module) {
    var tempStr = require('str/tempStr'),
        calendar = require('time/calendar');

    var wrapper = document.getElementById('wrapper');
    wrapper.appendChild(calendar.build());
});