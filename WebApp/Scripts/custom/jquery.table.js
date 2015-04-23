(function ($) {
    function _bindingColumns(target) {
        var grid = $(target);
        var state = grid.data('table');
        var option = state.options;
        if (!option.headerDiv) {
            var css = _generalStyle();
            grid.append(css);

            if (option.frozenable) {
                option.headerDiv = $('<div><div class="_frozened _header" style="overflow:hidden;"></div><div class="_unfrozened _header" style="overflow:hidden;"></div></div>').appendTo(grid);
                option.rowDiv = $('<div><div class="_frozened _content" style="overflow:auto;"></div><div class="_unfrozened _content" style="overflow:auto;"></div></div>').appendTo(grid);
            } else {
                option.headerDiv = $('<div><div class="_header" style="overflow:hidden"></div></div>').appendTo(grid);
                option.rowDiv = $('<div><div class="_content" style="overflow:auto"></div></div>').appendTo(grid);
            }
            $.each($('._header', option.headerDiv), function (i, node) {
                $('<table cellspacing="0" cellpadding="0" border="0"></table>').appendTo(node);
            });
            $.each($('._content', option.rowDiv), function (i, node) {
                $('<table cellspacing="0" cellpadding="0" border="0"></table>').appendTo(node);
            });
        }
    }

    function _generalStyle() {
        var css = '<style type="text/css">';
        css += '._header{height:24px;background-color:lightyellow;overflow:hidden;}';
        css += '._content{height:200px;background-color:lightblue;overflow:hidden;}';
        css += '._frozened{float:left;width:100px;background-color:green;}';
        css += '._unfrozened{float:left;width:100px;background-color:blue;}';
        css += '</style>';
        return css;
    }

    $.fn.table = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.table.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'table');
            if (state) {
                state = $.extend(state.options, options);
            } else {
                state = $.data(this, 'table', {
                    options: $.extend({}, $.fn.table.defaults, options)
                });
            }
            _bindingColumns($(this));

        });
    };
    $.fn.table.methods = {
        options: function (jq) {
            return $.data(jq[0], 'table').options;
        },
        set: function (jq, obj) {

        },
        clear: function (jq) {

        }
    };

    $.fn.table.defaults = {
        columns: [],
        frozenable: true
    };
})(jQuery);
