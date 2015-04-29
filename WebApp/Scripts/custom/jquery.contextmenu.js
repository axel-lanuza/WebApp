/*
By Mingyue
www.brightmoon.cn
mingyue@brightmoon.cn
*/
(function ($) {
    function generalStyle(options) {
        var css = '<style type="text/css">';
        css += '.c-menu-panel{box-shadow:2px 2px 2px #cccccc;height:' + (options.height === 'auto' ? '100%' : (options.height + 'px')) + ';width:' + (options.width === 'auto' ? '100%' : (options.width + 'px')) + ';background-color:#f7f3f3;position:absolute;border:1px solid #1d953f;border-radius:6px;}';
        css += '.c-menu-hide{display:none;}';
        css += '.c-menu-items{list-style-type:none;font-size:14px;}';
        css += '.c-menu-item{float:left;height:20px;width:100%;border-radius:6px;cursor:default;}';
        css += '.c-menu-item:hover{background-color:#d6c2c2;border-top-style:dotted;border-bottom-style:dotted;border-width:1px;}';
        css += '.c-menu-text{cursor:default;}';
        css += '.c-menu-affix{padding:1px;float:right;height:18px;width:18px;border-width:1px;}';
        css += '.c-menu-children{margin:0px;display:none;box-shadow:2px 2px 2px #cccccc;height:' + (options.height === 'auto' ? '100%' : (options.height + 'px')) + ';width:' + (options.width === 'auto' ? '100%' : (options.width + 'px')) + ';background-color:#f7f3f3;position:absolute;border:1px solid #1d953f;border-radius:6px;}';
        css += '.c-menu-img{margin:1px;float:left;height:18px;width:18px;border-width:1px;}';
        css += '</style>';
        return css;
    }

    function bindingClass(target, options) {
        var css = generalStyle(options);
        $(target).append(css);
    }

    function bindingItems(target) {
        var obj = $(target);
        var state = obj.data('contextmenu');
        var options = state.options;

        var _items = $('.c-menu-items', options.menu);
        for (var i = 0; i < options.items.length; i++) {
            bindingItem(_items, options, options.items[i]);
        }
        options.height = options.items.length * 20 + 2;
        options.menu.css('height', options.height);
    }

    function bindingItem(parent, options, item) {
        var id = item.id == undefined ? 'btn_' + item.text : item.id;
        if (!item.items)
            $('<li class="c-menu-item" id="' + id + '"><div class="c-menu-img"></div><div class="c-menu-text">' + item.text + '</div></li>').appendTo(parent);
        else {
            $('<li class="c-menu-item" id="' + id + '"><div class="c-menu-img"></div><div class="c-menu-text">' + item.text + '<div class="c-menu-affix">></div></div><div class="c-menu-children"><ul class="c-menu-items"></ul></div></li>').appendTo(parent);
        }
        var _item = $('#' + id, parent);
        if (item.img) {
            var _img = $('.c-menu-img', _item);
            _img.css('background', 'url(' + item.img + ') no-repeat');
        }
        if (!item.items) {
            _item.click(function () {
                options.menu.hide();
                if (item.click)
                    item.click();
                else if (options.onClick)
                    options.onClick(item);
            });
        } else {
            var children = $('.c-menu-children', _item);
            _item.hover(function (e) {
                children.css('left', $(this)[0].offsetLeft + $(this).width());
                children.css('top', $(this)[0].offsetTop);
                children.show();
            }, function () {
                children.hide();
            });
            var _items = $('.c-menu-items', children);
            for (var i = 0; i < item.items.length; i++) {
                bindingItem(_items, options, item.items[i]);
            }
            children.css('height', item.items.length * 20 + 2);
        }
    }

    function addItems(target, items) {
        var obj = $(target);
        var state = obj.data('contextmenu');
        var options = state.options;

        var _items = $('.c-menu-items', options.menu);
        for (var i = 0; i < items.length; i++) {
            bindingItem(_items, options, items[i]);
            options.items.push(items[i]);
        }
        options.height = options.items.length * 20 + 2;
        options.menu.css('height', options.height);
    }

    function find(items, item) {
        for (var i = 0; i < items.length; i++) {
            if (items[i] === item)
                return true;
        }
        return false;
    }

    function createMenu(target) {
        var obj = $(target);
        var state = obj.data('contextmenu');
        var options = state.options;

        document.onclick = function (e) {
            e = window.event || e;
            var _obj = $(e.srcElement || e.target);
            if (!(_obj[0].classList && _obj[0].classList.length > 0 && find(_obj[0].classList, 'c-menu-panel')))
                options.menu.hide();
        };
        var id = 'menu_' + (new Date()).getTime();
        $('<div id="' + id + '" class="c-menu-panel c-menu-hide"><ul class="c-menu-items"></ul></div>').appendTo(obj);
        options.id = id;
        options.menu = $('.c-menu-panel', obj);
        options.menu.hover(function () {

        }, function () {
            options.menu.hide();
        });
    }

    function clearItems(target) {
        var obj = $(target);
        var state = obj.data('contextmenu');
        var options = state.options;
        var items = $('#' + options.id + ' .c-menu-items', obj);
        items.empty();
    }

    function show(target, e) {
        var obj = $(target);
        var state = obj.data('contextmenu');
        var options = state.options;
        $(options.menu).css('top', e.pageY);
        $(options.menu).css('left', e.pageX);
        if (options.beforeShow)
            options.beforeShow(options);
        options.menu.show();
    }

    $.fn.contextmenu = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.contextmenu.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'contextmenu');
            if (state) {
                state = $.extend(state.options, options);
            } else {
                state = $.data(this, 'contextmenu', {
                    options: $.extend({}, $.fn.contextmenu.defaults, options)
                });
            }
            bindingClass($(this), state.options);
            createMenu($(this));
            bindingItems($(this));
        });
    };
    $.fn.contextmenu.methods = {
        options: function (jq) {
            return $.data(jq[0], 'contextmenu').options;
        },
        clear: function (jq) {
            clearItems(jq[0]);
        },
        binding: function (jq, items) {
            clearItems(jq[0]);
            $.extend($.data(jq[0], 'contextmenu').options, { items: items });
            bindingItems(jq[0]);
        },
        show: function (jq, e) {
            show(jq[0], e);
        },
        addItems: function (jq, items) {
            addItems(jq[0], items);
        }
    };

    $.fn.contextmenu.defaults = {
        'items': [],
        'height': '100',
        'width': '140',
        'background-color': 'white'
    };
})(jQuery);
