$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var title = $('.c-title');
    var tabs = $('.c-tabs');
    var content = $('.c-content');
    var cheight = height - title.height() - tabs.height() - 75;
    content.css('height', cheight);
    $.each($('.c-img'), function (i, img) {
        $(img).css('height', cheight);
    });
    $.each($('.c-fr'), function (i, fr) {
        $(fr).css('height', cheight);
    });
});