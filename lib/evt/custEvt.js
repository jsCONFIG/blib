/**
 * 自定义事件
 */
define( function ( require ) {
    var indexof = require( 'array/isArray' ),
        isType = require( 'extra/isType' ),
        unikey = require( 'str/unikey' ),
        toArray = require( 'array/toArray' );
    
    var custStore = {},
        that = {};

    // 基单元
    var custMod = function () {
        this.dataStore = {};
    };

    custMod.prototype.add = function ( evtType, fn ) {
        if( !isType( evtType, 'string' ) || !isType( fn, 'function' ) ) {
            return false;
        }

        var self = this;
        if( !self.dataStore[ evtType ] ) {
            self.dataStore[ evtType ] = [ fn ];
            return true;
        }

        self.dataStore[ evtType ].push( fn );
    };

    custMod.prototype.del = function ( evtType, fn ) {
        var self = this;

        // 该情况下删除所有的绑定方法
        if( isType( evtType, 'undefined' ) ) {
            self.dataStore = {};
            return true;
        }

        if( isType( fn, 'undefined' ) ) {
            self.dataStore[ evtType ] = [];
            return true;
        }

        if( !isType( evtType, 'string' ) || !isType( fn, 'function' ) ) {
            return false;
        }

        if( !self.dataStore[ evtType ] ) {
            return false;
        }

        var pos = indexof( fn, self.dataStore[ evtType ] );

        if( pos == -1 ) { return false; }

        self.dataStore[ evtType ].splice( pos, 1 );
        return true;
    };

    // 触发事件
    custMod.prototype.trigger = function () {
        var argL = arguments.length;
        if( argL == 0 ) {
            return false;
        }
        var self = this;

        var evtType = arguments[ 0 ];

        var myFns = self.dataStore[ evtType ];
        if( !myFns || !myFns.length ) { return false; }

        var itemFn;

        if( argL > 1 ) {
            var data = isType( arguments[ 1 ], 'array' ) ? arguments[1] : [ arguments[1] ];
            for( var i = 0, fnsL = myFns.length; i < fnsL; i++ ) {
                itemFn = myFns[ i ];
                itemFn && itemFn.apply( self, data );
            }
        }

        else {
            for( var i = 0, fnsL = myFns.length; i < fnsL; i++ ) {
                itemFn = myFns[ i ];
                itemFn && itemFn();
            }
        }
    };

    that.on = function ( unit, evtType, fn ) {
        if( isType( unit, 'undefined' ) || isType( unit, 'null' ) ) {
            return false;
        }

        var myMod;

        if( unit._evtCust_ && (myMod = custStore[ unit._evtCust_ ]) ) {
            myMod.add( evtType, fn );
            return true;
        }

        var key = ( '_evtCust_' + unikey() );
        unit._evtCust_ = key;

        myMod = custStore[ key ] = new custMod();
        
        myMod.add( evtType, fn );
        
        return true;
    };

    that.off = function ( unit, evtType, fn ) {
        if( isType( unit, 'undefined' ) || isType( unit, 'null' ) ) {
            return false;
        }

        var myMod;

        if( unit._evtCust_ && (myMod = custStore[ unit._evtCust_ ]) ) {
            myMod.del( evtType, fn );
            return true;
        }

        return false;
    };

    // 触发
    that.trigger = function ( unit, evtType ) {
        var argL = arguments.length;
        if( argL < 2 
                || isType( unit, 'undefined' )
                || isType( unit, 'null' ) ) {
            return false;
        }

        var myMod;

        if( unit._evtCust_ && (myMod = custStore[ unit._evtCust_ ]) ) {
            myMod.trigger.apply( myMod, toArray( arguments, 1 ) );
            return true;
        }

        return false;
    };


    return that;
});