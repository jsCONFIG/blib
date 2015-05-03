/**
 * 移动设备检测
 * @return {[type]}
 */
define(function (require) {
    var ua = navigator.userAgent;
    var OSRegExp = {
        android: /(Android)\s+([\d.]+)/,
        ipad: /(iPad).*OS\s([\d_]+)/,
        iphone: /(iPhone\sOS)\s([\d_]+)/,
        touchpad: /TouchPad/,
        webos: /(webOS|hpwOS)[\s\/]([\d.]+)/,
        kindle: /Kindle\/([\d.]+)/,
        blackberry: /(BlackBerry).*Version\/([\d.]+)/,
        bb10: /(BB10).*Version\/([\d.]+)/,
        rimtabletos: /(RIM\sTablet\sOS)\s([\d.]+)/,
        playbook: /PlayBook/
    };
    var osKey = [ "android", "ios", "ipad", "iphone", "touchpad", "webos", "kindle", "blackberry", "bb10", "rimtabletos", "playbook" ];
    var testOS = {};
    for (var i = 0, c = osKey.length; i < c; ++i) {
        var key = osKey[i];
        testOS[key] = ua.match(OSRegExp[key]);
    }
    return testOS;
});