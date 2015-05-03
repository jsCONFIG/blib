/**
 * 微博分享工具
 **/
define(['../obj/parseParam', '../extra/isType', '../extra/jsonToQuery'], function (parseParam, isType, jsonToQuery) {
    var rootUrl = 'http://service.weibo.com/share/share.php';
    return function ( conf ) {
        var cf = parseParam({
            // 创建该分享的网站域名，<必须>
            'url' : location.href,
            // 样式 button / icon
            'type' : 'button',
            // 默认@的账号的uid
            'ralateUid' : undefined,
            // 语言
            'language' : 'zh_cn',
            // appkey <必须>
            'appkey' : undefined,
            // 默认文案，无则使用页面标题
            'title' : undefined,
            // 图片地址，无则不填，多个则使用数组，组件自动encodeURIComponent，最多三个
            'pic' : undefined,
            // 是否自动抓取页面图片
            'searchPic' : false,
            // 分享按钮的形式，simple / text / number / full
            'style' : 'simple'
        }, conf);

        var target = {};
        for( var i in cf ) {
            if( cf.hasOwnProperty( i ) && !isType( cf[i], 'undefined' ) ) {
                var item = cf[i];
                if( i == 'pic' ) {
                    if( !isType( item, 'array' ) ) {
                        item = [ item ];
                    }
                    for( var j = 0, iL = item.length; j < iL; j++ ) {
                        item[j] = encodeURIComponent( item[j] );
                    }
                    item = item.join('||');
                }
                if( i == 'url' || i == 'title' ) {
                    item = encodeURIComponent( item );
                }
                target[ i ] = item;
            }
        }

        var theUrl = rootUrl + '?' + jsonToQuery( target );
        window.open( theUrl );
    };
});