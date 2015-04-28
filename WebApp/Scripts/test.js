$(function () {
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
        height:200,
        pageSize: 10,
        onRowContextMenu: function (e, row) {

        }
    });
});