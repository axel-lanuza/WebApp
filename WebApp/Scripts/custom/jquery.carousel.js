/*
By Mingyue
www.brightmoon.cn
*/
(function ($) {
    function generalStyle(options) {
        if (!options['nav-width'])
            options['nav-width'] = (options.width != 'auto' && !isNaN(options.width)) ? options.width / 2 : 20;
        var css = '<style type="text/css">';
        css += '.my-regional{width:' + options.width + 'px;height:' + options.height + 'px;}';
        css += '.my-regional ul,li{list-style:none;}';
        css += '.my-regional div,ul,li,a,img{margin:0;padding:0;}';
        css += '.my-img{height:auto;width:auto;max-width:100%;max-height:100%;}';
        css += '.my-regional a{text-decoration:none;}';
        css += '.my-wrapper{position:absolute;margin:' + options.margin + ';border:' + (options.border ? 1 : 0) + 'px solid black;background-color:' + options['background-color'] + ';}';
        css += '.my-banner{overflow:hidden;}';
        css += '.my-img-list{z-index:10;}';
        css += '.my-img-list li{display:none;}';
        css += '.my-img-list .my-imgOn{display:inline;}';
        css += '.my-info-background{position:absolute;bottom:0;width:' + options.width + 'px;height:' + options['info-height'] + 'px;z-index:999999;opacity:' + options['info-opacity'] + ';filter:alpha(opacity=' + options['info-opacity'] + ');background:' + options['info-background-color'] + ';}';
        css += '.my-info-list{position:absolute;left:20px;bottom:10px;z-index:999999;}';
        css += '.my-info-list li{display:none;}';
        css += '.my-info-list .my-infoOn{display:inline;color:black;}';
        css += '.my-index-list{position:absolute;right:20px;bottom:5px;z-index:9999999;font-size:8pt;text-align:center;}';
        css += '.my-index-list li{float:left;margin:1px 1px 5px 1px;padding:2px 4px;width:10px;height:10px;cursor:pointer;background-color:#000 \9;background-color:rgba(0, 0, 0, 0);border:1px solid black;border-radius:20px;}';
        css += '.my-index-list .my-indexOn{display:inline;background:lightgreen;color:green;}';
        css += '.my-nav{top:0;height:100%;width:' + options['nav-width'] + 'px;margin:1px;position:absolute;color:white;cursor:pointer;opacity:0.1;filter:alpha(opacity=10)}';
        css += '.my-nav:hover{background-color:' + options['nav-color'] + ';}';
        css += '</style>';
        return css;
    }

    function bindingClass(target, options) {
        var css = generalStyle(options);
        target.append(css);
        var wrapper = $('<div class="my-wrapper my-regional"><div class="my-nav my-left" style="left:0px;"></div><div class="my-nav my-right" style="right:0px;"></div><div class="my-panel my-regional"></div></div>').appendTo(target);
        var panel = $('.my-panel', wrapper);
        var left = $('.my-left', wrapper).click(function () {
            prev(panel, options);
        });
        var right = $('.my-right', wrapper).click(function () {
            next(panel, options);
        });
        wrapper.hover(function () {
            options['auto-carousel'] = false;
        }, function () {
            options['auto-carousel'] = options['auto'];
        });
    }

    function prev(panel, options) {
        if (options.total > 0) {
            var curIndex = options['now-index'];
            clearStatus(panel, curIndex);
            curIndex = (options.total + curIndex - 1) % options.total;
            options['now-index'] = curIndex;
            if (options.onChange)
                options.onChange(options.data[curIndex]);
            changeTo(panel, curIndex);
        }
    }

    function next(panel, options) {
        if (options.total > 0) {
            var curIndex = options['now-index'];
            clearStatus(panel, curIndex);
            curIndex = (curIndex + 1) % options.total;
            options['now-index'] = curIndex;
            if (options.onChange)
                options.onChange(options.data[curIndex]);
            changeTo(panel, curIndex);
        }
    }

    function bindingData(target, data) {
        var list = $(target);
        var state = list.data('carousel');
        var panel = $('.my-panel', list);
        if (data !== undefined) {
            if (typeof data === 'string')
                data = JSON.parse(data);
            state.options.data = data;
            var imglist = [], infolist = [], indexlist = [];
            var stretch = state.options['stretch'];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                imglist.push('<li class="img-' + i + '"><a href="' + (item.href ? item.href : '#') + '"><img src="' + item.src + '" class="my-regional' + (stretch ? '' : ' my-img') + '" alt="' + (item.alt ? item.alt : item.src) + '"></a></li>');
                infolist.push('<li class="info-' + i + '" style="' + state.options['info-style'] + '">' + item.info + '</li>');
                indexlist.push('<li class="index-' + i + '">' + (state.options['show-index'] ? (i + 1) : '') + '</li>');
            }
            var sl = '<div class="my-banner my-regional"><ul class="my-img-list my-regional" style="text-align:center;">';
            sl += imglist.join('');
            sl += '</ul><div class="my-info-background"></div><ul class="my-info-list">';
            sl += infolist.join('');
            sl += '</ul><ul class="my-index-list">';
            sl += indexlist.join('');
            sl += '</ul></div>'
            var images = $(sl).appendTo(panel);
            var defindex = state.options['default-index'];
            $('.my-img-list li', images).each(function (i, item) {
                if (i == defindex) {
                    $(this).addClass('my-imgOn');
                    return;
                }
            });
            $('.my-info-list li', images).each(function (i, item) {
                if (i == defindex) {
                    $(this).addClass('my-infoOn');
                    return;
                }
            });
            $('.my-index-list li', images).each(function (i, item) {
                if (i == defindex) {
                    $(this).addClass('my-indexOn');
                    return;
                }
            });
            carousel(panel, state.options, data.length);
        }
    }

    function carousel(parent, options, count) {
        options['now-index'] = options['default-index'];
        options['total'] = count;
        options['auto-carousel'] = options['auto']
        var imglist = $('.my-img-list', parent);
        var indexlist = $('.my-index-list', parent);
        clearInterval(options.autoChange);
        options.autoChange = setInterval(function () {
            if (options['auto-carousel'])
                next(parent, options);
        }, options['interval']);

        $('li', indexlist).each(function (item) {
            $(this).hover(function () {
                options['auto-carousel'] = false;
                var curIndex = options['now-index'];
                clearStatus(parent, curIndex);
                changeTo(parent, item);
                curIndex = item;
                if (options.onChange)
                    options.onChange(options.data[curIndex]);
                options['now-index'] = curIndex;
            }, function () {
                options['auto-carousel'] = options['auto'];
            });
        });
    }

    function clearStatus(parent, oldindex) {
        $('.my-img-list .img-' + oldindex, parent).removeClass('my-imgOn');
        $('.my-info-list .info-' + oldindex, parent).removeClass('my-infoOn');
        $('.my-index-list .index-' + oldindex, parent).removeClass('my-indexOn');
    }

    function changeTo(parent, newindex) {
        $('.my-img-list .img-' + newindex, parent).addClass('my-imgOn');
        $('.my-info-list .info-' + newindex, parent).addClass('my-infoOn');
        $('.my-index-list .index-' + newindex, parent).addClass('my-indexOn');
    }

    function clearData(target) {
        $('.my-panel', target).empty();
    }

    $.fn.carousel = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.carousel.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'carousel');
            if (state) {
                state = $.extend(state.options, options);
            } else {
                state = $.data(this, 'carousel', {
                    options: $.extend({}, $.fn.carousel.defaults, options)
                });
            }
            bindingClass($(this), state.options);
            bindingData($(this), options.data);
        });
    };
    $.fn.carousel.methods = {
        options: function (jq) {
            return $.data(jq[0], 'carousel').options;
        },
        clear: function (jq) {
            clearData(jq[0]);
        },
        loadData: function (jq, data) {
            clearData(jq[0]);
            bindingData(jq[0], data);
        },
        prev: function (jq) {
            var options = $.data(jq[0], 'carousel').options;
            var panel = $('.my-panel', jq[0]);
            prev(panel, options);
        },
        next: function (jq) {
            var options = $.data(jq[0], 'carousel').options;
            var panel = $('.my-panel', jq[0]);
            next(panel, options);
        },
        getIndex: function (jq) {
            var options = $.data(jq[0], 'carousel').options;
            return options['now-index'];
        },
        getData: function (jq, index) {
            var options = $.data(jq[0], 'carousel').options;
            return options.data[index];
        }
    };

    $.fn.carousel.defaults = {
        'data': [],
        'height': 'auto',
        'width': 'auto',
        'background-color': 'white',
        'info-background-color': 'black',            //显示信息背景颜色
        'info-height': 40,                           //显示信息背景的高度
        'info-opacity': 0.1,                         //显示信息背景的透明
        'info-style': 'font-size:12pt;color:black;', //显示信息样式
        'default-index': 0,                          //初始时默认序号
        //'nav-width': 10,                           //左右侧导航宽度，未设置是默认为heihht的一半（height不为auto时，否则为20）
        'nav-color': '#f6fafa',                      //左右侧导航颜色
        'interval': 5000,                            //自动切换周期
        'show-index': false,                         //默认不显示右下侧按钮上的序号
        'auto': true,                                //自动切换
        'border': true,                              //显示边框
        'margin': '30px auto',
        'stretch': true,
        onChange: function (item) { }
    };
})(jQuery);
