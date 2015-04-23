$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var top = $('.top');
    var topheight = top.height();
    topheight = topheight == null ? 0 : topheight;
    var left = $('.left');
    var middle = $('.middle');
    var right = $('.right');
    var text = $('.text');

    left.css('height', height - topheight);
    middle.css('height', height - topheight);
    right.css('height', height - topheight);
    left.css('width', '45%');
    right.css('width', '45%');
    middle.css('width', width - left.width() - right.width());
    text.css('width', left.width() - 5);
    text.css('height', height - topheight - 5);

    right.objtree({});

    var t = { obj: { name: 'obj', bool: true, arr: [1, 2, 3, 4, 5] }, name: 'json', array1: ['1-1', '1-2', '1-3', '1-4'], array2: [21, 22, 23, 24] };
    right.objtree('set', t);

    $(".ok").click(function () {
        var t = text.val();
        right.objtree('clear');
        if (t.length == 0) {
            alert('请在左侧框中输入对象字符串...');
            return;
        }
        try {
            right.objtree('set', t);
            //right.objtree('toggleAll');
        } catch (e) {
            alert(e);
            return;
        }
    });
});