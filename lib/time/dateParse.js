define(function (require, exports, module) {
    return function (dateObj) {
        dateObj = dateObj || new Date();

        return {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate()
        };
    };
});