'use strict';

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');

// 全选,不选,反选
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
        callback: {
            add: function add() {},
            subtract: function subtract() {},
            blur: function blur() {}
        }
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
    var cb = opts.callback;
    var add = getDomArray(opts.add)[0];
    var subtract = getDomArray(opts.subtract)[0];
    var input = getDomArray(opts.input)[0];
    var step = opts.step;
    var min = opts.min;
    var value = opts.value;
    var max = opts.max;
    var offClass = opts.offClass;
    var cbAdd = cb.add;
    var cbSubtract = cb.subtract;
    var cbBlur = cb.blur;
    // 初始化结构
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    if (max === 0) {}
    if (value === min && value === max) {
        add.classList.add(offClass);
        subtract.classList.add(offClass);
        input.readOnly = true;
    }
    input.value = value;
    if (add) {}
    if (subtract) {}
    if (input) {}
};

module.exports = AddSubtractInput;