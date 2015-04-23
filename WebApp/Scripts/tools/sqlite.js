$(function () {
    var left = $('.c-left');
    var center = $('.c-center');
    var bottom = $('.c-bottom');

    var leftmain = $('.c-panel-main', left);
    var centermain = $('.c-panel-main', center);
    var bottommain = $('.c-panel-main', bottom);

    var tablelist = $('#tablelist', leftmain);
    var detailsql = $('#detailsql', bottommain);
    var operate = $('#operate', center);

    refreshTableList(centermain, tablelist);
    var btnrefresh = $('.c-panel-bottom #refresh', left).click(function () {
        refreshTableList(centermain, tablelist);
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
        loadData(type, centermain, sql);
    });
});

function loadData(type, parent, sql) {
    var head = $('.c-head', parent).empty();
    var rows = $('.c-rows', parent).empty();
    loadStatus(true, '正在执行，请稍候...');
    postWebService('/SQLiteDbService.asmx/' + type, { sql: sql }, function (data) {
        bindingData(head, rows, data, type);
        loadStatus(false);
    });
}

function refreshTableList(detailpanel, tablelist) {
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
                    loadData('Select', detailpanel, sql);
                });
            });
        }
        loadStatus(false);
    });
}

function bindingData(head, rows, data, type) {
    if (data.Result && type === 'Select') {
        var colcount = data.Data.ColumnNames.length;
        var cl = '';
        var rsl = '';
        for (var cindex = 0; cindex < colcount; cindex++) {
            cl += '<th>' + data.Data.ColumnNames[cindex] + '</th>';
        }
        for (var rindex = 0; rindex < data.Data.Rows.length; rindex++) {
            var rl = '<tr>';
            for (var cindex = 0; cindex < colcount; cindex++) {
                rl += '<td>' + data.Data.Rows[rindex][cindex] + '</td>';
            }
            rl += '</tr>';
            rsl += rl;
        }
        $(cl).appendTo(head);
        $(rsl).appendTo(rows);
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