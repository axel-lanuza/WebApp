$(function () {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var user = navigator.userAgent;
            $.post('/TrackingService.asmx/Upload', { time: dateToString(new Date()), id: user, latitude: r.point.lat, longitude: r.point.lng }, function (_data) { });
        }
    }, { enableHighAccuracy: true });
});