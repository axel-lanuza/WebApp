(function ($) {
	function padLeft(str, total, ch) {
		if (!ch || ch.constructor !== String)
			ch = '*';
		return '' + Array(Math.max(Math.ceil((total - str.length) / ch.length), 0) + 1).join(ch).slice(str.length - total) + str + '';
	};

	function generalId(preid, name, level) {
		return (preid + '_' + name + '_' + level).replace('[', '_').replace(']', '_');
	}

	function generalMargin(level) {
		return 'margin-left:' + (level * 20) + 'px';
	}

	function _bindingBoolean(target, options, level, name, obj) {
		var id = generalId(target[0].id, name, level);
		var sl = '<div id="' + id + '" style="' + generalMargin(level) + '"><div class="name">' + name + ':</div>';
		sl += '<div class="val-bool">' + obj + '</div></div>';
		$(sl).appendTo(target);
	}

	function _bindingNumber(target, options, level, name, obj) {
		var id = generalId(target[0].id, name, level);
		var sl = '<div id="' + id + '" style="' + generalMargin(level) + '"><div class="name">' + name + ':</div>';
		sl += '<div class="val-num">' + obj + '</div></div>';
		$(sl).appendTo(target);
	}

	function _bindingString(target, options, level, name, obj) {
		var id = generalId(target[0].id, name, level);
		var val;
		if (obj != undefined)
			val = '"' + obj + '"';
		else
			val = obj;

		var sl = '<div id="' + id + '" style="' + generalMargin(level) + '"><div class="name">' + name + ':</div>';
		sl += '<div class="val-str">' + val + '</div></div>';
		$(sl).appendTo(target);
	}

	function toggle(panel, marknode, mark) {
		var _mark;
		if (mark === undefined)
			_mark = $(marknode).html();
		else
			_mark = mark;
		if (_mark === '-') {
			$(marknode).html('+');
			$(panel).fadeOut('fast');
		}
		else {
			$(marknode).html('-');
			$(panel).fadeIn('fast');
		}
		//$(panel).fadeToggle('fast');
	}

	function _bindingArray(target, options, level, name, obj) {
		var id = generalId(target[0].id, name, level);
		var sl = '<div style="' + generalMargin(level) + '"><div class="mark">-</div><div class="name">' + name + '</div><div class="tag">&lt;Array&gt;</div><div class="len">[' + obj.length + ']</div><br><div id="' + id + '" class="contain"></div></div>';
		var _arr = $(sl).appendTo(target);
		var _arrytree = $('.contain', _arr);
		var _mark = $('.mark', _arr);
		_mark.click(function () {
			toggle(_arrytree, _mark);
		});
		$('.name', _arr).click(function () {
			toggle(_arrytree, _mark);
		});
		for (var item in obj) {
			var _obj = obj[item];
			bindingData(_arrytree, options, level + 1, '[' + item + ']', _obj);
		}
	}

	function _bindingObj(target, options, level, name, obj) {
		var id = generalId(target[0].id, name, level);
		var sl = '<div style="' + generalMargin(level) + '"><div class="mark">-</div><div class="name">' + name + '</div><div class="tag">&lt;Object&gt;</div><br><div id="' + id + '" class="contain"></div></div>';
		var _tree = $(sl).appendTo(target);
		var _objtree = $('.contain', _tree);
		var _mark = $('.mark', _tree);
		_mark.click(function () {
			toggle(_objtree, _mark);
		});
		$('.name', _tree).click(function () {
			toggle(_objtree, _mark);
		});
		for (var item in obj) {
			var _obj = obj[item];
			bindingData(_objtree, options, level + 1, item, _obj);
		}
	}

	function bindingData(pre, options, level, name, obj) {
		if (obj == undefined) {
			_bindingString(pre, options, level, name, obj);
		} else if (obj.constructor === Boolean) {
			_bindingBoolean(pre, options, level, name, obj);
		} else if (obj.constructor === Number) {
			_bindingNumber(pre, options, level, name, obj);
		} else if (obj.constructor === String) {
			_bindingString(pre, options, level, name, obj);
		}
		else if (obj.constructor === Object) {
			_bindingObj(pre, options, level, name, obj);
		} else if (obj.constructor === Array) {
			_bindingArray(pre, options, level, name, obj);
		}
	}

	function generalStyle(options) {
		var css = '<style type="text/css">';
		css += '._objtree{font-size:14px;overflow:' + options.overflow + ';background-color:' + options['background-color'] + '}'
		css += '.tag{float:left;color:' + options.color.tag + ';}';
		css += '.name{float:left;font-weight:bold;color:' + options.color.name + ';cursor:pointer;}';
		css += '.val-str{float:left;color:' + options.color.string + ';}';
		css += '.val-num{float:left;color:' + options.color.num + ';}';
		css += '.val-bool{float:left;color:' + options.color.bool + ';}';
		css += '.len{float:left;color:#6f6b6b;}';
		css += '.mark{float:left;color:#6f6b6b;width:8px;text-align:center;cursor:pointer;}';
		css += '.contain{}';
		css += '.btn{position:relative;cursor:pointer;top:2px;text-align:center;width:50px;height:23px;}';
		css += '</style>';
		return css;
	}

	function toggleTree(tree) {
		var parent = $('.contain:first', tree);
		var state = $(tree).data('objtree');
		var children = parent.children('*');
		if (state.options.mark === undefined)
			state.options.mark = '-';
		$.each(children, function (i, child) {
			toggleNode(child, state.options.mark);
		});
		if (state.options.mark === '-')
			state.options.mark = '+';
		else
			state.options.mark = '-';
	}

	function find(nodes, className) {
		for (var i in nodes) {
			if (nodes[i].className === className)
				return nodes[i];
		}
		return undefined;
	}

	function toggleNode(node, mark) {
		try {
			$.each(node.childNodes, function (i, childnode) {
				if (childnode.className === 'contain') {
					var marknode = find(node.childNodes, 'mark');
					if (marknode)
						toggle(childnode, marknode, mark);
				}
			});
		} catch (e) {
			return;
		}
	}

	function bindingClass(tree, options) {
		var css = generalStyle(options);
		tree.append(css);
		tree.addClass('_objtree');
		if (options.showbtn) {
			var width = tree.width();
			var sl = '<div style="position:relative;background-color:#eae5e5;height:25px;"><input type="button" class="btn" value="折叠"/></div>';
			var _panel = $(sl).appendTo(tree);
			var _btn = $('.btn', _panel).click(function () {
				toggleTree(tree);
			});
			_btn.css('left', width - 100);
		}
		$('<div class="contain"></div>').appendTo(tree);
	}

	function bindingObj(target, obj) {
		var tree = $(target);
		var state = tree.data('objtree');
		var _tree = $('.contain', tree);
		if (obj !== undefined) {
			if (typeof obj === 'string')
				obj = JSON.parse(obj);
			var level = 0;
			for (var _obj in obj) {
				var item = obj[_obj];
				bindingData(_tree, state.options, level, _obj, item);
			}
		}
	}

	function clearObjs(target) {
		var tree = $(target);
		var node = $('.contain:first', tree);
		node.empty();
	}

	$.fn.objtree = function (options, param) {
		if (typeof options == 'string') {
			return $.fn.objtree.methods[options](this, param);
		}

		options = options || {};
		return this.each(function () {
			var state = $.data(this, 'objtree');
			if (state) {
				state = $.extend(state.options, options);
			} else {
				state = $.data(this, 'objtree', {
					options: $.extend({}, $.fn.objtree.defaults, options)
				});
			}
			bindingClass($(this), state.options);
			bindingObj($(this), options.obj);
		});
	};
	$.fn.objtree.methods = {
		options: function (jq) {
			return $.data(jq[0], 'objtree').options;
		},
		set: function (jq, obj) {
			bindingObj(jq[0], obj);
		},
		clear: function (jq) {
			clearObjs(jq[0]);
		},
		toggleAll: function (jq) {
			toggleTree(jq[0]);
		}
	};

	$.fn.objtree.defaults = {
		color: {
			name: 'blue',
			bool: 'red',
			string: 'green',
			num: 'red',
			tag: '#9f9393'
		},
		overflow: 'auto',
		showbtn: true,
		'background-color': '#f8a4a4'
	};
})(jQuery);
