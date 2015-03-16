$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var top = $('.top');
    var topheight = top.height();
    var left = $('.left');
    var middle = $('.middle');
    var right = $('.right');
    var input = $('#input');
    var output = $('#output');

    left.css('height', height - topheight);
    middle.css('height', height - topheight);
    right.css('height', height - topheight);
    left.css('width', '45%');
    right.css('width', '45%');
    middle.css('width', width - left.width() - right.width());

    input.css('width', left.width() - 5);
    input.css('height', height - topheight - 5);
    output.css('width', right.width() - 5);
    output.css('height', height - topheight - 5);

    $(".ok").click(function () {
        var _input = input.val();
        if (_input.length == 0) {
            alert('请在左侧框中输入对象字符串...');
            return;
        }
        try {
            var info = JSON2CSharp.convert(_input);
            output.html(info);
        } catch (e) {
            alert(e);
        }
    });
});