const extend = require('zhf.extend');
const getDomArray = require('zhf.get-dom-array');

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
        callback: function () {
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
    const callback = opts.callback;
    const add = getDomArray(opts.add)[0];
    const subtract = getDomArray(opts.subtract)[0];
    const input = getDomArray(opts.input)[0];
    const step = Number(opts.step);
    const min = Number(opts.min);
    let value = Number(opts.value);
    let max = Number(opts.max);
    const offClass = opts.offClass;

    function renderValue() {
        callback({min: min, max: max, value: value});
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
