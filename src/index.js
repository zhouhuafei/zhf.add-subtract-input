const extend = require('zhf.extend');
const getDomArray = require('zhf.get-dom-array');

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
            add: function () {
            },
            subtract: function () {
            },
            blur: function () {
            },
        },
    }, opts);
    this.init();
}

// 初始化
AddSubtractInput.prototype.init = function () {
    this.power();
};

// 功能
AddSubtractInput.prototype.power = function () {
    const self = this;
    const opts = self.opts;
    const cb = opts.callback;
    const add = getDomArray(opts.add)[0];
    const subtract = getDomArray(opts.subtract)[0];
    const input = getDomArray(opts.input)[0];
    const step = opts.step;
    const min = opts.min;
    let value = opts.value;
    const max = opts.max;
    const offClass = opts.offClass;
    const cbAdd = cb.add;
    const cbSubtract = cb.subtract;
    const cbBlur = cb.blur;
    // 初始化结构
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    if (max === 0) {

    }
    if (value === min && value === max) {
        add.classList.add(offClass);
        subtract.classList.add(offClass);
        input.readOnly = true;
    }
    input.value = value;
    if (add) {

    }
    if (subtract) {

    }
    if (input) {

    }
};

module.exports = AddSubtractInput;
