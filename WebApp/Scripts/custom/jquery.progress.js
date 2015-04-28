/*
By Mingyue
www.brightmoon.cn
mingyue@brightmoon.cn
*/
(function ($) {
    $.fn.progressDialog = function () { };

    $.fn.progressDialog.showDialog = function (text) {
        text = text || "Loading,Please wait...";
        createElement(text);
        setPosition();
        waterfall.appendTo("body");
        $(window).bind('resize', function () {
            setPosition();
        });
    }

    $.fn.progressDialog.hideDialog = function () {
        waterfall.remove();
    }

    function createElement(text) {
        if (!waterfall) {
            waterfall = $(document.createElement("div"));
            waterfall.attr("id", "waterfall");
            waterfall.css({
                "height": "100%",
                "width": "100%",
                "filter": "alpha(opacity = 50)",
                "-moz-opacity": "0.5",
                "opacity": "0.5",
                "background-color": "#CCCCCC",
                "position": "absolute",
                "left": "0px",
                "top": "0px"
            });
        }
        if (!loadDiv) {
            loadDiv = document.createElement("div");
        }
        $(loadDiv).appendTo(waterfall);
        var content = "<span>" + text + "</span>";
        $(loadDiv).html(content);
    }

    function setPosition() {
        var leftOffset = ($(document).width() - 120) / 2;
        var topOffset = ($(document).height() - 60) / 2;
        $(loadDiv).css({
            "position": "absolute",
            "height": "60px",
            "width": "120px",
            "left": leftOffset + "px",
            "top": topOffset + "px"
        });
    }
    var waterfall;
    var loadDiv;
    $.showDialog = $.fn.progressDialog.showDialog;
    $.hideDialog = $.fn.progressDialog.hideDialog;
})(jQuery);