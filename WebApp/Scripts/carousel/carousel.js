$(function () {
    var data = [
            { src: 'Content/home/1.jpg', info: '1.jpg点击图片导航到about.html', alt: '', href: 'about.html' },
            { src: 'Content/home/2.jpg', info: '2.jpg' },
            { src: 'Content/home/3.jpg', info: '3.jpg' },
            { src: 'Content/home/4.jpg', info: '4.jpg' },
            { src: 'Content/home/5.jpg', info: '5.jpg' },
            { src: 'Content/home/6.jpg', info: '6.jpg' },
            { src: 'Content/home/7.jpg', info: '7.jpg' }
    ];
    var caro = $('#container').carousel({
        data: [],// data,
        'info-opacity': 0,
        height: 500,
        width: 700,
        interval: 2000,
        'default-index': 2,
        'show-index': true,
        'nav-width': 20,
        'nav-color': 'red',
        onChange: function (item) {

        }
    });

    //caro.carousel('clear');
    caro.carousel('loadData', data);

    var index = caro.carousel('getIndex');
    var data = caro.carousel('getData', index);

    $('#next').click(function () {
        caro.carousel('next');
    });
    $('#prev').click(function () {
        caro.carousel('prev');
    });
});