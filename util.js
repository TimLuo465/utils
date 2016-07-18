(function() {
    var root = (0, eval)('this');
    var previous_u = root._u;

    var _u = function(obj) {
        if (obj instanceof _u) return obj;
        if (this instanceof _u) return new _u(obj);
        _u._wrapped = obj;
    };

    root._u = _u;

    var isType = function(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]";
        }
    }

    var getProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        }
    }

    // Type detection
    _u.isObject = isType("Object");
    _u.isArray = Array.isArray || isType("Array");
    _u.isNubmer = isType("Number");
    _u.isBoolean = isType("Boolean");
    _u.isFunction = isType("Function");
    _u.isString = isType("String");
    _u.isArguments = function(obj) {
    	return obj && _u.hasKey(obj, "callee");
    }

    var MAX_ARR_INDEX = Math.pow(2, 53) - 1;
    var getLength = getProperty("length");

    _u.keys = Object.keys || _u.keys;

    _u.hasKey = function(obj, key) {
        return obj && Object.hasOwnProperty.call(obj, key);
    }

    _u.keys = function(obj) {
        if (!_u.isObject(obj)) return [];
        var keys = [];

        for (var key in obj) {
            if (_u.hasKey(obj, key)) {
                keys.push(key);
            }
        }

        return keys;
    }

    _u.isArrayLike = function(collection) {
        var length = getLength(collection);
        return isNubmer(length) && length >= 0 && length <= MAX_ARR_INDEX;
    }

    _u.each = function(obj, fn) {
        if (_u.isArrayLike(obj)) {
            for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(obj[i], obj[i], i);
            }
        } else {
        	var keys = _u.keys(obj);
        	for(var i = 0, l = keys.length; i < l; i++) {
        		fn.call(obj[keys[i]], keys[i], i);
        	}
        }
        
        return obj;
    }
})();
