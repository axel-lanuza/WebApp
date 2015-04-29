$(function () {
    var left = $('.c-left');
    var center = $('.c-center');
    var bottom = $('.c-bottom');

    var leftmain = $('.c-panel-main', left);
    var info = $('#i-info', center);
    var menu = $('#menu').contextmenu({
        width: 80,
        beforeShow: function (opts) {

        },
        onClick: function (item) {

        },
        items: [{
            id: 'export', text: '导出', img: 'Content/my/icons/ExportToFile_16_16.png', click: function () {
                alert('导出');
            }
        }, {
            id: 'chart', text: '图表', img: 'Content/my/icons/PieChart_16_16.png', click: function () {
                alert('图表');
            }
        }, {
            id: 'map', text: '地图', img: 'Content/my/icons/Globe_16_16.png', click: function () {
                var row = tablemain.table('getSelectedRow');
                alert('地图');
            }
        }]
    });
    var tablemain = $('.c-panel-main', center).table({
        border: true,
        pageSize: 50,
        onCompleted: function (opt) {
            info.text('当前为第' + (opt.totalCount > 0 ? (opt.pageNumber + 1) : 0) + '页，共' + opt.totalCount + '页');
        },
        onRowContextMenu: function (e, row) {
            menu.contextmenu('show', e);
        }
    });
    var bottommain = $('.c-panel-main', bottom);
    var tablelist = $('#tablelist', leftmain);
    var detailsql = $('#detailsql', bottommain);
    var operate = $('#operate', center);

    var first = $('#i-first', center).click(function () {
        loadStatus(true, '正在执行，请稍候...');
        tablemain.table('first');
        loadStatus(false);
    });
    var last = $('#i-last', center).click(function () {
        loadStatus(true, '正在执行，请稍候...');
        tablemain.table('last');
        loadStatus(false);
    });
    var prev = $('#i-prev', center).click(function () {
        loadStatus(true, '正在执行，请稍候...');
        tablemain.table('prev');
        loadStatus(false);
    });
    var next = $('#i-next', center).click(function () {
        loadStatus(true, '正在执行，请稍候...');
        tablemain.table('next');
        loadStatus(false);
    });
    var size = $('#i-size', center).change(function () {
        var pageSize = $(this).val();
        loadStatus(true, '正在执行，请稍候...');
        tablemain.table('updateSize', parseInt(pageSize));
        loadStatus(false);
    });
    refreshTableList(tablemain, size, tablelist);
    var btnrefresh = $('.c-panel-bottom #refresh', left).click(function () {
        refreshTableList(tablemain, size, tablelist);
    });

    var btnexecute = $('.c-panel-bottom #execute', center).click(function () {
        var sql = detailsql.val();
        if (!sql || sql.length == 0) {
            alert("请输入正确的Sql语句...");
            return;
        }
        var ope = operate.val();
        var type;
        if (ope == 0)
            type = 'Select';
        else
            type = 'Edit';
        loadData(type, size, tablemain, sql);
    });
});

function loadData(type, size, parent, sql) {
    parent.table('clear');
    $("option[value='50']", size).attr("selected", true);
    loadStatus(true, '正在执行，请稍候...');
    postWebService('/SQLiteDbService.asmx/' + type, { sql: sql }, function (data) {
        bindingData(parent, data, type);
        loadStatus(false);
    });
}

function refreshTableList(detailpanel, size, tablelist) {
    $(tablelist).empty();
    loadStatus(true, '正在执行，请稍候...');
    postWebService('/SQLiteDbService.asmx/ShowTableList', {}, function (data) {
        if (data.Result) {
            var sl = "";
            for (var i = 0; i < data.Data.Rows.length; i++) {
                sl += '<a href="#" class="list-group-item">' + data.Data.Rows[i] + '</a>';
            }
            $(sl).appendTo(tablelist);
            $('.list-group-item', tablelist).each(function (i, item) {
                $(item).dblclick(function () {
                    var name = $(item).text();
                    var sql = 'select * from ' + name;
                    loadData('Select', size, detailpanel, sql);
                });
            });
        }
        loadStatus(false);
    });
}

function bindingData(parent, data, type) {
    //parent.table('clear');
    if (data.Result && type === 'Select') {
        var cols = [];
        var colcount = data.Data.ColumnNames.length;
        for (var cindex = 0; cindex < colcount; cindex++) {
            var col = data.Data.ColumnNames[cindex];
            cols.push({ field: col, title: col });
        }
        var rows = data.Data.Rows;
        parent.table('set', { columns: cols, rows: rows });
        return;
    }
    alert(data.Message + ',' + data.Data);
}

function postWebService(url, options, func) {
    $.post(url, options, function (_data) {
        if (_data !== undefined && _data.childNodes.length > 0) {
            var r = _data.childNodes[0].textContent;
            if (func) {
                var data = JSON.parse(r);
                func(data);
            }
        }
    });
}

function loadStatus(execting, text) {
    if (execting)
        $.showDialog(text);
    else
        $.hideDialog();
}