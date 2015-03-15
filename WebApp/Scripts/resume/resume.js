var template;
$(function () {
    var height = this.documentElement.clientHeight;
    var width = this.documentElement.clientWidth;
    var container = $('#container');
    $('#container').load('View/resume/template.html', function (responseTxt, statusTxt, xhr) {
        template = $('.template', this);
        template.css('height', height);
        if (width < 800)
            template.css('margin-left', '0');
        else if (width < 1000)
            template.css('margin-left', '10%');
        template.css('width', 800);
        load();
    });
});

function load() {

}