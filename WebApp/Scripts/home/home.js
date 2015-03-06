var i = 0;
$(function () {
    $('#panel').click(imgchange);
    $('.infopanel').mouseenter(function () {
        $(this).addClass('panelenter');
        $('#panel').unbind("click");
    }).mouseleave(function () {
        $(this).removeClass('panelenter');
        $('#panel').click(imgchange);
    });
});

function imgchange() {
    i = (i + 1) % 22;
    $('body').css('background-image', 'url("Content/home/' + i + '.jpg")');
}