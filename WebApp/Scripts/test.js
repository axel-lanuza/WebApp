$(function () {
    var menu = $('#menu').contextmenu({
        onClick: function (item) {

        },
        items: [{
            id: 'btn1', text: 'btn1', img: 'Content/my/icons/Accept_16_16.png'
        },
            {
                id: 'btn2', text: 'btn2', img: 'Content/my/icons/Stop_16_16.png', click: function () {

                }
            }]
    });
    var table = $('#container').table({
        columns: [{ field: 'col1', title: '列1' }, { field: 'col2', title: '列2' }],
        rows: [
            ['nihao1', 'zhende1'], ['nihao2', 'zhende2'], ['nihao3', 'zhende3'], ['nihao4', 'zhende4'], ['nihao5', 'zhende5'],
             ['nihao6', 'zhende6'], ['nihao7', 'zhende7'], ['nihao8', 'zhende8'], ['nihao9', 'zhende9'],
            ['nihao10', 'zhende10'], ['nihao11', 'zhende11'], ['nihao12', 'zhende12'], ['nihao13', 'zhende13'], ['nihao14', 'zhende14'],
            ['nihao15', 'zhende15'], ['nihao16', 'zhende16'], ['nihao17', 'zhende17'], ['nihao18', 'zhende18'],
             ['nihao19', 'zhende19'], ['nihao20', 'zhende20'], ['nihao21', 'zhende21'], ['nihao22', 'zhende22'], ['nihao23', 'zhende23']
        ],
        //border: false,
        width: '100%',//600,
        height: 200,
        pageSize: 10,
        onRowContextMenu: function (e, row) {
            menu.contextmenu('show', e);
        }
    });
    menu.contextmenu('addItems', [{
        id: 'btn3', text: 'btn3', img: 'Content/my/icons/ExportToFile_16_16.png', items: [
            {
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
            }
        ]
    }]);
});