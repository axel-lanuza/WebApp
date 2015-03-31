$(function () {
    var _map = $('#map');
    var height = this.documentElement.clientHeight - 50;
    var width = this.documentElement.clientWidth - 400;
    _map.css('height', height);
    _map.css('width', width);
    var _panel = $('.panel');
    _panel.css('height', height);
    _panel.css('width', 400);
    $('.title').css('width', 396);

    var search = $('#search', _panel);
    var inputinfo = $('#inputinfo', _panel);

    var parent = $('#container', _panel);
    parent.css('height', height - 49);
    parent.objtree({});

    var map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(106.651977, 37.140511), 5); // 创建Map实例
    map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
    map.enableScrollWheelZoom();                            //启用滚轮放大缩小
    map.addControl(new BMap.MapTypeControl());          //添加地图类型控件

    map.clearOverlays();

    map.addEventListener("click", function (e) {
        inputinfo.val(e.point.lng + ',' + e.point.lat);
        getLocation(parent, e.point);
    });

    search.click(function () {
        var info = inputinfo.val();
        if (info.length == 0) {
            alert('请在左侧框中输入正确的经、纬度...');
            return;
        }
        if (info.indexOf(',') > 0) {
            var _point = info.split(',');
            if (_point.length === 2) {
                var poi = { lng: _point[0], lat: _point[1] };                
                getLocation(parent, poi);
                focusOnPoint(map, poi);
                return;
            } else {
                alert('请在左侧框中输入正确的经、纬度...');
                return;
            }
        }
        else {
            alert('请在左侧框中输入正确的经、纬度...');
            return;
        }
    });
});

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

function getLocation(parent, point) {
    postWebService('/MapService.asmx/GetPointLocation', point, function (data) {
        parent.objtree('clear');
        if (data.Result) {
            parent.objtree('set', data.Data);
            //var d = JSON2CSharp.convert(data.Data);
        }
    });
}

function focusOnPoint(map, point) {
    map.centerAndZoom(new BMap.Point(point.lng, point.lat), 14);
}

function drawHeatMap(map, points) {
    /*var points = [{ "lng": 116.418261, "lat": 39.921984, "count": 512340 },
              { "lng": 121.461801, "lat": 31.275322, "count": 456671 }];*/

    var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({ data: points, max: 100 });
}

function drawCurveLine(map, linedatas) {
    /*var linedatas = [
    {
        src: [121.461801, 31.275322],
        dest: [[117.060247, 30.569492], [117.005055, 32.678818], [117.354604, 32.942941]]
    },
    {
        src: [120.137195, 30.32241],
        dest: [[118.775795, 32.093401], [113.606155, 34.792169], [114.286855, 30.641107]]
    }];*/

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
}