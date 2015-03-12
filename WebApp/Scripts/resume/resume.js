var template;
$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var container = $('#container');
    $('body').load('View/resume/template.html', function (responseTxt, statusTxt, xhr) {
        $(responseTxt).appendTo(container);
        template = $('.template');
        template.css('height', height);
        template.css('width', 800);
        load();
    });
});

function load() {

}