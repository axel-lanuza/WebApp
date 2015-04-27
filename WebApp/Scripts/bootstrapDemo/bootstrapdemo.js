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

    var data = [
            { src: 'Content/home/1.jpg', info: '' },
            { src: 'Content/home/8.jpg', info: '' },
            { src: 'Content/home/3.jpg', info: '' },
            { src: 'Content/home/4.jpg', info: '' },
            { src: 'Content/home/5.jpg', info: '' },
            { src: 'Content/home/6.jpg', info: '' },
            { src: 'Content/home/7.jpg', info: '' }
    ];
    $('#home-carousel', content).carousel({
        data: data,
        'info-opacity': 0,
        height: cheight,
        width: width - 226,
        interval: 5000,
        'default-index': 0,
        //'show-index': true,
        'nav-width': 20,
        'nav-color': 'red',
        'margin': '0px',
        'border': false,
        //'auto': false,
        'stretch': false,
        //'background-color': 'lightgreen',
        onChange: function (item) {

        }
    });
});