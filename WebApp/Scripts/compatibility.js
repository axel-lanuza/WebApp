if (Array.prototype.indexOf === undefined) {
    Array.prototype.indexOf = function (elt, from) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
if (Array.prototype.find === undefined) {
    Array.prototype.find = function (func) {
        for (var i = 0; i < this.length; i++) {
            if (func(this[i]))
                return this[i];
        }
    };
}
if (Array.prototype.findIndex === undefined) {
    Array.prototype.findIndex = function (func) {
        for (var i = 0; i < this.length; i++) {
            if (func(this[i]))
                return i;
        }
        return -1;
    };
}

if (String.prototype.contains === undefined) {
    String.prototype.contains = function (str) {
        return this.indexOf(str) !== -1;
    };
}

//去掉左边的空白 
if (String.prototype.trimLeft === undefined) {
    String.prototype.trimLeft = function () {
        if (this == null) return "";
        var whitespace = new String(" /t/n/r");
        var str = new String(this);
        if (whitespace.indexOf(str.charAt(0)) != -1) {
            var j = 0, i = str.length;
            while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
                j++;
            }
            str = str.substring(j, i);
        }
        return str;
    };
}

//去掉右边的空白
if (String.prototype.trimRight === undefined) {
    String.prototype.trimRight = function () {
        if (this == null) return "";
        var whitespace = new String(" /t/n/r");
        var str = new String(this);
        if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
            var i = str.length - 1;
            while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
                i--;
            }
            str = str.substring(0, i + 1);
        }
        return str;
    };
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun/*, thisArg*/) {
        'use strict';
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}

String.prototype.padLeft = function (total, ch) {
    if (!ch || ch.constructor !== String)
        ch = ' ';
    return Array(Math.max(Math.ceil((total - this.length) / ch.length), 0) + 1).join(ch).slice(this.length - total) + this;
};

String.prototype.padRight = function (total, ch) {
    if (!ch || ch.constructor !== String)
        ch = ' ';
    return this + Array(Math.max(Math.ceil((total - this.length) / ch.length), 0) + 1).join(ch).slice(0, total - this.length);
};

String.prototype.padCenter = function (total, ch, c) {
    if (!ch || ch.constructor !== String)
        ch = ' ';
    return this.padLeft(Math[c ? "ceil" : "floor"]((this.length + total) / 2), ch).padRight(total, ch);
};

function fill0(val, length) {
    val = val.toString();
    length -= val.length;
    for (; length > 0; --length)
        val = '0' + val;
    return val;
}

function dateToString(date) {
    return date.getFullYear() + '-' + fill0(date.getMonth() + 1, 2) + '-' + fill0(date.getDate(), 2) + ' ' + fill0(date.getHours(), 2) + ':' + fill0(date.getMinutes(), 2) + ':' + fill0(date.getSeconds(), 2);
}

function dateToFullString(date) {
    return date.getFullYear() + '年' + fill0(date.getMonth() + 1, 2) + '月' + fill0(date.getDate(), 2) + '日 ' + fill0(date.getHours(), 2) + ':' + fill0(date.getMinutes(), 2) + ':' + fill0(date.getSeconds(), 2);
}
