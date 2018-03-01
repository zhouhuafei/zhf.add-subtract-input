'use strict';

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');

// 加减输入框
function AddSubtractInput(opts) {
    this.opts = extend({
        add: null,
        subtract: null,
        input: null,
        step: 1,
        min: 1,
        value: 1,
        max: 99999999,
        offClass: 'off',
        callback: function callback() {}
    }, opts);
    this.init();
}

// 初始化
AddSubtractInput.prototype.init = function () {
    this.power();
};

// 功能
AddSubtractInput.prototype.power = function () {
    var self = this;
    var opts = self.opts;
    var callback = opts.callback;
    var add = getDomArray(opts.add)[0];
    var subtract = getDomArray(opts.subtract)[0];
    var input = getDomArray(opts.input)[0];
    var step = Number(opts.step);
    var min = Number(opts.min);
    var value = Number(opts.value);
    var max = Number(opts.max);
    var offClass = opts.offClass;

    function renderValue() {
        callback({ min: min, max: max, value: value });
        add && add.classList.remove(offClass);
        subtract && subtract.classList.remove(offClass);
        // 初始化结构
        if (max <= 0) {
            max = min;
        }
        if (value <= min) {
            value = min;
            subtract && subtract.classList.add(offClass);
        }
        if (value >= max) {
            value = max;
            add && add.classList.add(offClass);
        }
        if (value === min && value === max) {
            add && add.classList.add(offClass);
            subtract && subtract.classList.add(offClass);
            input && (input.readOnly = true);
        }
        input && (input.value = value);
    }

    renderValue();
    if (add) {
        add.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            value += step;
            renderValue();
        });
    }
    if (subtract) {
        subtract.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            value -= step;
            renderValue();
        });
    }
    if (input) {
        input.addEventListener('blur', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            value = Number(this.value);
            renderValue();
        });
    }
};

module.exports = AddSubtractInput;