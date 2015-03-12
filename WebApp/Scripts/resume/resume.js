var template;
$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var doc = this.documentElement;
    var container = $('#container');
    $('#container').load('View/resume/template.html', function (responseTxt, statusTxt, xhr) {
        template = $('.template', this);
        template.css('height', height);
        template.css('width', 800);
        load();
    });
});

function load() {

}