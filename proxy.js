! function() {
    var slice = Array.prototype.slice,
    	pro = Object.prototype;
    
    var _assign = function(evnetname1, eventname2, callback, once) {
    	var proxy = this,
    		argsLength = arguments.length,
    		times = 0,
    		flag = {};

    	if(argsLength < 3) return proxy;

    	var events = slice.call(arguments, 0, -2)
    		callback = arguments[argsLength - 2],
    		isOnce = arguments[argsLength - 1];

    	if(!isFunction(callback)) return;
    	

    }

    function Proxy() {
    	if(! (this instanceof Proxy)) {
    		return new Proxy();
    	}
    	this.callbacks = {};
    	this.fired = {};
    }

    Proxy.create = function() {
        var proxy = new Proxy(),
            args = slice.call(arguments);
        if(args.length)
        	proxy.assign.apply(proxy, args);

        return proxy;
    }

    Proxy.prototype = {
        assign: function(event1, event2, callback) {
        	var args = slice.call(arguments);
        	_assign
        },
        emit: function(eventname, data) {

        }
    }



    function isFunction(fn) {
    	return pro.toString.call(fn) === "[object Function]";
    }

    window.Proxy = Proxy;
}(window)
