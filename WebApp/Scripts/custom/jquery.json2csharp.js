(function ($) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
    }

    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    if (Array.prototype.find === undefined) {
        Array.prototype.find = function (func) {
            for (var i = 0; i < this.length; i++) {
                if (func(this[i]))
                    return this[i];
            }
        };
    }

    var JSON2CSharp = {
        _allClass: [],
        _genClassCode: function (obj, name) {
            var _name = name || "Root";
            var _cls = this._allClass.find(function (cls) {
                return cls.name === _name;
            });
            if (!_cls) {
                var clas = "public class {0}\r\n{\r\n".format(_name);
                for (var n in obj) {
                    var v = obj[n];
                    n = n.trim();
                    clas += "    {0}    public {1} {2} { get; set; }\r\n".format(this._genComment(v), this._genTypeByProp(n, v), n);
                }
                clas += "}\r\n";
                this._allClass.push({ name: _name, code: clas });
            }
            var _allcls = [];
            for (var clsindex = 0; clsindex < this._allClass.length; clsindex++) {
                _allcls.push(this._allClass[clsindex].code);
            }
            return _allcls.join("\r\n");
        },
        _genTypeByProp: function (name, val) {
            switch (Object.prototype.toString.apply(val)) {
                case "[object Boolean]": {
                    return "bool";
                }
                case "[object Null]": {
                    return "object";
                }
                case "[object Number]": {
                    return val.toString().indexOf(".") > -1 ? "double" : "int";
                }
                case "[object Date]": {
                    return "DateTime";
                }
                case "[object Object]": {
                    name = name.substring(0, 1).toUpperCase() + name.substring(1);
                    this._genClassCode(val, name);
                    return name;
                }
                case "[object Array]": {
                    return "List&#60;{0}&#62;".format(this._genTypeByProp(name + "Item", val[0]));
                }
                default: {
                    return "string";
                }
            }
        },
        _genComment: function (val) {
            var commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
            return "/// &#60;summary&#62;\r\n    /// " + commm + "\r\n    /// &#60;/summary&#62;\r\n";
        },
        convert: function (jsonObj) {
            this._allClass = [];
            if (typeof jsonObj === 'string')
                jsonObj = JSON.parse(jsonObj);
            return this._genClassCode(jsonObj);
        }
    }

    window.JSON2CSharp = jQuery.JSON2CSharp = JSON2CSharp;
})(jQuery);
