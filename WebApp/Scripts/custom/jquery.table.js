/*
By Mingyue
www.brightmoon.cn
mingyue@brightmoon.cn
*/
(function ($) {
    function generalStyle(options) {
        var css = '<style type="text/css">';
        if (options.border)
            css += 'table,td,th{border-style:dotted;border-width:1px;border-collapse:collapse;}';
        else
            css += 'table,td,th{padding:0;border-collapse:collapse;}';
        css += '#' + options.id + '{padding:0;margin:0;width:' + (options.width === 'auto' ? '100%' : (options.width + 'px')) + ';height:' + (options.height === 'auto' ? '100%' : (options.height + 'px')) + ';}';
        css += '.c-panel{overflow:auto;width:100%;height:100%;}';
        css += '.c-head{background-color:#93c9f2;}';
        css += '.c-rows{}';
        css += '.c-rows >tr:hover{background-color:#f2e6e3}';
        css += '.c-foot{height:16px;width:100%;margin:0;padding:0px;background-color:#b9c7e1;font-size:12px;}';
        css += '.c-prev,.c-next,.c-first,.c-last{margin:5px;cursor:pointer;}';
        css += '.c-size{height:16px;width:50px;}';
        css += '</style>';
        return css;
    }

    function bindingClass(target, options) {
        var id = 'table_' + (new Date()).getTime();
        $.extend(options, { id: id });
        var sl = '<div id="' + id + '" oncontextmenu="return false">';
        sl += '<div class="c-panel">';
        sl += '<table><thead><tr class="c-head"></tr></thead><tbody class="c-rows"></tbody></table>';
        sl += '</div>';
        sl += '<div class="c-foot"><select class="c-size"></select><span class="c-first">首页</span><span class="c-prev">上一页</span><span class="c-next">下一页</span><span class="c-last">尾页</span><span class="c-info"></span></div></div>';
        $(sl).appendTo(target);
        var css = generalStyle(options);
        $(target).append(css);
        var container = $('#' + options.id, target);
        options.rowsDiv = $('.c-rows', container);
        options.size = $('.c-size', container).change(function () {
            var pageSize = options.size.val();
            options.pageSize = parseInt(pageSize);
            options.pageNumber = 0;
            options.totalCount = (options.rows.length % options.pageSize) == 0 ? (options.rows.length / options.pageSize) : (parseInt(options.rows.length / options.pageSize) + 1);
            bindingRows(options);
        });
        for (var i = 1; i <= 3; i++)
            options.size.append('<option value="' + (i * options.pageSize) + '">' + (i * options.pageSize) + '</option>');

        options.first = $('.c-foot .c-first', target).click(function () {
            options.pageNumber = 0;
            bindingRows(options);
        });
        options.last = $('.c-foot .c-last', target).click(function () {
            options.pageNumber = options.totalCount - 1;
            bindingRows(options);
        });
        options.prev = $('.c-foot .c-prev', target).click(function () {
            bindingRows(options, true, false);
        });
        options.next = $('.c-foot .c-next', target).click(function () {
            bindingRows(options, false, true);
        });
        options.info = $('.c-foot .c-info', target);
        if (options.onContextMenu !== undefined) {
            container.bind("contextmenu", function (e) {
                options.onContextMenu(e);
            });
        }
        options.rowsDiv.scroll(function () {
            options.scrollLeft = options.rowsDiv.scrollLeft();
        });
    }

    function clear(target) {
        var table = $(target);
        var options = table.data('table').options;
        if (options.headerDiv)
            options.headerDiv.empty();
        if (options.rowsDiv)
            options.rowsDiv.empty();
    }

    function bindingData(target) {
        var table = $(target);
        var options = table.data('table').options;
        if (options.resetCols || !options.headerDiv) {
            if (options.headerDiv)
                options.headerDiv.empty();
            options.headerDiv = $('#' + options.id + ' .c-head', table);
            var cols = options.columns;
            var css = '<style type="text/css">';
            var cls = '';
            for (var ci = 0; ci < cols.length; ci++) {
                var colstyle = '';
                var col = cols[ci];
                if (col.width)
                    colstyle += 'width:' + col.width + 'px;';
                if (col.align)
                    colstyle += 'text-align:' + col.align + ';';
                if (col.hidden)
                    colstyle += 'display:none;';
                if (colstyle.length > 0) {
                    css += '.t-c' + col.field + '{' + colstyle + '}';
                    cls += '<th class=".t-c' + col.field + '">' + col.title + '</th>';
                    col.styleable = true;
                } else {
                    cls += '<th>' + col.title + '</th>';
                }
                if (col.formatter !== undefined && typeof col.formatter === 'string') {
                    col.formatter = eval(col.formatter);
                } else if (col.formatter === null)
                    col.formatter = undefined;
            }
            css += '</style>';
            options.headerDiv.append(css);
            options.headerDiv.append(cls);
        }
        options.info.text('');
        options.totalCount = (options.rows.length % options.pageSize) == 0 ? (options.rows.length / options.pageSize) : (parseInt(options.rows.length / options.pageSize) + 1);
        options.pageNumber = 0;
        bindingRows(options);
    }

    function bindingRows(options, prev, next) {
        var rowStart = options.pageNumber * options.pageSize;
        if (next && options.pageNumber < options.totalCount) {
            rowStart += options.pageSize;
            options.pageNumber += 1;
        } else if (prev && options.pageNumber > 0) {
            rowStart -= options.pageSize;
            options.pageNumber -= 1;
        }
        var offset = (options.rows.length - rowStart);
        if (options.totalCount > 0 && offset <= 0) {
            alert('已经为最后一页...');
            return;
        }
        if (options.rowsDiv)
            options.rowsDiv.empty();
        options.info.text('当前为第' + (options.pageNumber + 1) + '页，共' + options.totalCount + '页');
        var len = offset > options.pageSize ? options.pageSize : offset;
        for (var ri = 0; ri < len; ri++) {
            var row = options.rows[rowStart + ri];
            var rl = '<tr id="r-' + (rowStart + ri) + '">';
            for (var ci = 0; ci < options.columns.length; ci++) {
                var col = options.columns[ci];
                var val;
                if (col.formatter)
                    val = col.formatter(row[ci], row, rowStart + ri);
                else
                    val = row[ci];
                var style = '';
                if (col.styler)
                    style += col.styler(row[ci], row, rowStart + ri);
                rl += '<td';
                if (col.styleable)
                    rl += ' class="t-c' + col.field;
                if (style)
                    rl += ' style:' + style;
                rl += '>' + val + '</td>';
            }
            rl += '</tr>';
            var _row = $(rl).appendTo(options.rowsDiv);
            if (options.onDblClickRow) {
                $(_row).bind("dblclick", function (e) {
                    options.onDblClickRow(e, row);
                });
            }
            if (options.onRowContextMenu) {
                $(_row).bind("contextmenu", function (e) {
                    options.onRowContextMenu(e, row);
                });
            }
            if (options.onCellContextMenu) {
                $('td', _row).each(function (i, item) {
                    $(item).bind("contextmenu", function (e) {
                        options.onCellContextMenu(e, row, row[i], i);
                    });
                });
            }
        }
        if (options.onCompleted)
            options.onCompleted(options);
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
            bindingClass($(this), state.options);
            bindingData($(this));
        });
    };
    $.fn.table.methods = {
        options: function (jq) {
            return $.data(jq[0], 'table').options;
        },
        set: function (jq, obj) {
            $.extend($.data(jq[0], 'table').options, obj);
            bindingData(jq[0]);
        },
        clear: function (jq) {
            clear(jq[0]);
        },
        first: function (jq) {
            var options = $.data(jq[0], 'table').options;
            options.pageNumber = 0;
            bindingRows(options);
        },
        last: function (jq) {
            var options = $.data(jq[0], 'table').options;
            options.pageNumber = options.totalCount - 1;
            bindingRows(options);
        },
        prev: function (jq) {
            var options = $.data(jq[0], 'table').options;
            bindingRows(options, true, false);
        },
        next: function (jq) {
            var options = $.data(jq[0], 'table').options;
            bindingRows(options, false, true);
        },
        updateSize: function (jq, size) {
            var options = $.data(jq[0], 'table').options;
            options.pageNumber = 0;
            options.pageSize = size;
            options.totalCount = (options.rows.length % options.pageSize) == 0 ? (options.rows.length / options.pageSize) : (parseInt(options.rows.length / options.pageSize) + 1);
            bindingRows(options);
        }
    };

    $.fn.table.defaults = {
        columns: [],/*
                      [{field:'',title:'',width:'',align:'',hidden:false,formater:function(val,row,rowindex){},styler:function(val,row,rowindex){}}]
                    */
        rows: [],
        border: true,
        resetCols: true,
        onRowsContextMenu: function (e, row) { },
        onCellContextMenu: function (e, row, cell, colindex) { },
        onDblClickRow: function (row, index) { },
        onContextMenu: function (e) { },
        onCompleted: function (opt) { },
        width: 'auto',
        height: 'auto',
        pageSize: 50,
        pageNumber: 0
    };
})(jQuery);
