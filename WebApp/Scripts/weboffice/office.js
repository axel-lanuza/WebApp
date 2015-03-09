$(function () {

});

function onunload() {
    try {
        var panel = $('#officepanel');
        panel[0].Close();
        var height = document.documentElement.clientHeight;
        var width = document.documentElement.clientWidth;
        panel.css('height', height);
        panel.css('width', width);
    } catch (e) {
      
    }
}