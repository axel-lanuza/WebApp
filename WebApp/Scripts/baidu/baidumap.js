$(function () {
    var _map = $('#map');
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth - 300;
    _map.css('height', height);
    _map.css('width', width);
    var _panel = $('#panel');
    _panel.css('height', height);
    _panel.css('width', 300);
    var map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(106.651977, 37.140511), 5); // 创建Map实例
    map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
    map.enableScrollWheelZoom();                            //启用滚轮放大缩小
    map.addControl(new BMap.MapTypeControl());          //添加地图类型控件

    var linedatas = [
        {
            src: [121.461801, 31.275322],
            dest: [[116.416342, 39.917813],
                [117.267217, 31.90526],
                [118.775795, 32.093401],
                [113.606155, 34.792169],
                [120.137195, 30.32241],
                [115.905817, 28.729517],
                [87.518788, 43.844599],
                [90.97748, 29.778218],
                [101.716902, 36.704248],
                [106.279431, 38.51895],
                [111.79862, 40.961529],
                [126.590047, 45.943185],
                [125.339031, 43.851257],
                [123.352123, 41.903029],
                [117.170631, 39.152094],
                [116.949864, 36.704248],
                [114.447831, 38.171208],
                [112.460923, 37.938446],
                [102.599972, 25.127053],
                [108.855053, 34.358458],
                [103.924577, 30.744456],
                [106.42661, 29.722027],
                [112.902458, 28.363991],
                [106.573788, 26.724132],
                [108.339929, 22.964512],
                [114.227064, 22.486626],
                [113.491172, 22.281304],
                [110.326837, 19.863899],
                [119.304718, 26.19421],
                [103.814194, 36.079512],
                //
                [118.752799, 30.966673],
                [117.796139, 30.982526],
                [118.366455, 31.362193],
                [118.495237, 31.708867],
                [118.311264, 32.335837],
                [116.489931, 31.771759],
                [118.311264, 29.738085],
                [117.060247, 30.569492],
                [117.005055, 32.678818],
                [117.354604, 32.942941],
                [115.790834, 32.911909],
                [116.949864, 33.699784],
                [115.790834, 33.914802]
            ]
        },
        {
            src: [120.137195, 30.32241],
            dest: [[118.775795, 32.093401], [113.606155, 34.792169], [114.286855, 30.641107]]
        }, {
            src: [117.262618, 31.913107],
            dest: [
                   [118.752799, 30.966673],
                   [117.796139, 30.982526],
                   [118.366455, 31.362193],
                   [118.495237, 31.708867],
                   [118.311264, 32.335837],
                   [116.489931, 31.771759],
                   [118.311264, 29.738085],
                   [117.060247, 30.569492],
                   [117.005055, 32.678818],
                   [117.354604, 32.942941],
                   [115.790834, 32.911909],
                   [116.949864, 33.699784],
                   [115.790834, 33.914802]]
        }
    ];

    for (var lindex in linedatas) {
        var linedata = linedatas[lindex];
        var src = new BMap.Point(linedata.src[0], linedata.src[1]);
        for (var pindex in linedata.dest) {
            var point = linedata.dest[pindex];
            var points = [src];
            var dest = new BMap.Point(point[0], point[1]);
            points.push(dest);
            var curve = new BMapLib.CurveLine(points, { strokeCount: 1, strokeColor: "blue", strokeWeight: 1, strokeOpacity: 0.4 }); //创建弧线对象
            map.addOverlay(curve); //添加到地图中
        }
    }

    var _points = [
    { "lng": 116.418261, "lat": 39.921984, "count": 512340 },
    { "lng": 121.461801, "lat": 31.275322, "count": 456671 },
    { "lng": 91.124658, "lat": 29.842397, "count": 156671 },
    { "lng": 115.905817, "lat": 28.729517, "count": 356671 },
    { "lng": 87.518788, "lat": 43.844599, "count": 256671 }
    ];

    var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({ data: _points, max: 100 });

    //$.post('/MapService.asmx/GetCitysPosition', { citys: '上海,杭州' }, function (_data) {
    //    var r = _data.childNodes[0].textContent;
    //    alert(r);
    //});
});