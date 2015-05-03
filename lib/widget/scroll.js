/**
 * !@基于jq
 * js模拟滚动效果
 * 实现方案：
 * 使用css的overflow隐藏真实的scroll bar
 * 使用js模拟自定义的scroll bar拖动效果,
 * @param {node} contentBox 要滚动的节点（外层）
 * @param {node} scrollBar 滚动条节点
 */
define(['../obj/parseParam'], function (parseParam) {
    return function ( contentBox, scrollBar, conf ) {
        var cf = parseParam( {
            // 滚动条是否可操控
            ctrl: true,

            // 滚动方向，v/h 垂直/水平
            scrollDir: 'v',

            // 控制展示的样式
            barStyle: 'margin-top',

            // 包裹的内容的高度/宽度
            contentSize: 200,

            // 可滚动的范围
            barRange: 100,

            // 是否自动控制滚动条的长度
            autoBarHeight: false,

            // 滚动条滚动方向(1/-1)
            barDir: 1,

            buffer: 0,

            // 到底和到顶的回调
            onBottom: function () {},
            onTop: function () {}
        }, conf );
        var that = {};

        var conBNd = $( contentBox ),
            barNd = $( scrollBar ),
            conWrapperH = conBNd.height();

        var scrollTimer, scrollPos = 0, state = 'end', barTopPos = 0, currentBarPos = 0;

        var barAvailH = cf.barRange, handPos = 0;

        var dir, evtDir, sizeAttr, posDir;

        if( cf.scrollDir === 'v' ) {
            dir = 'scrollTop';
            evtDir = 'pageY';
            sizeAttr = 'height';
            posDir = 'top';
        }
        else {
            dir = 'scrollLeft';
            evtDir = 'pageX';
            sizeAttr = 'width';
            posDir = 'left';   
        }

        var getBarHeight = function () {
            var bh = cf.barRange * conWrapperH / ( conWrapperH + cf.contentSize );
            return bh;
        };

        // 根据内容的scroll位置，返回“滚动条”的位置
        var sPosToBarPos = function ( sTop ) {
            var barPos = sTop  * barAvailH / ( conBNd[0].scrollHeight - conWrapperH);
            return barPos;
        };

        // “滚动条”位置转scroll位置
        var barPosToSPos = function ( barPos ) {
            var sTop = barPos * (conBNd[0].scrollHeight - conWrapperH) / barAvailH;
            return sTop;
        };

        // 内容滚动的监听
        var cScroll = function () {
            if( state != 'end' ) {
                return;
            }
            if( !scrollTimer ) {
                scrollTimer = setTimeout( function () {
                    scrollPos = conBNd[ dir ]();
                    var barPos = sPosToBarPos( scrollPos );
                    barNd.css( cf.barStyle, (barPos * cf.barDir) + 'px' );
                    scrollTimer = undefined;
                    if( scrollPos <= cf.buffer ) {
                        cf.onTop( scrollPos );
                    }
                    else if( scrollPos >=  (cf.contentSize - cf.barRange) - cf.buffer ) {
                        cf.onBottom( scrollPos );
                    }
                }, 60 );
            }
        };

        // “滚动条”移动的“监听”
        var barMov = function ( pos ) {
            var sTop = barPosToSPos( pos );
            conBNd[ dir ]( sTop );
        };

        var barHandler = {
            'start' : function ( e ) {
                state = 'start';
                var ePos = e[evtDir];
                currentBarPos = (barNd.offset())[posDir];
                // 开始时，点击在“滚动条”上的位置
                handPos = ePos - currentBarPos;
                $('body').on( 'mousemove', barHandler.moving );
            },
            'moving' : function ( e ) {
                if( state == 'end' ) {
                    return;
                }
                state = 'moving';
                var ePos = e[evtDir];
                var targetPos = ePos - barTopPos - handPos;
                if( targetPos < 0 ) {
                    targetPos = 0;
                }
                else if( targetPos > barAvailH ) {
                    targetPos = barAvailH;
                }

                barNd.css( cf.barStyle, ( targetPos * cf.barDir) + 'px' );
                var targetScroll = barPosToSPos( targetPos );

                conBNd[ dir ]( targetScroll );
            },
            'end' : function () {
                state = 'end';
                $('body').unbind( 'mousemove', barHandler.moving );
            }
        };

        var evtInit = function () {
            conBNd.on( 'scroll', cScroll );
            barNd.on( 'mousedown', barHandler.start );
            $('body').on( 'mouseup', barHandler.end );
        };

        var init = function () {
            barTopPos = (barNd.offset())[posDir];
            if( cf.autoBarHeight ) {
                var barH = getBarHeight();
                barNd.css( sizeAttr, barH + 'px' );
                barAvailH = ( barRange - barH );
            }
            evtInit();

            // 初始位置
            scrollPos = conBNd[ dir ]();
            var barPos = sPosToBarPos( scrollPos );
            barNd.css( cf.barStyle, (barPos * cf.barDir) + 'px' );
        };

        init();

        that.fresh = function() {
            that.destroy();
            init();
        };

        that.destroy = function () {
            $('body').unbind( 'mouseup', barHandler.end );
            conBNd.unbind( 'scroll', cScroll );
            barNd.unbind( 'mousedown', barHandler.start );
            barNd.unbind( 'mouseup', barHandler.end );
        };

        return that;
    };
});