$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var body = $('body');
    $('body').append($('<div class="back"></div>'));
    var back = $('.back');
    back.click(function () {
        location = 'home.html';
    });
    back.css('left', '10');
    back.css('top', height - 80);
});