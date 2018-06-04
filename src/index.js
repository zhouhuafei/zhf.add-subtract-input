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
        offClass: '_off',
        isAsync: false,
        callbackAsync: function () { // 异步加减输入框里的值
        },
        callback: function () {
        },
    }, opts);
    this.init();
}

// 渲染
AddSubtractInput.prototype.render = function () {
    const self = this;
    const opts = self.opts;
    const handleData = {};
    handleData.cbFnAsync = opts.callbackAsync;
    handleData.cbFn = opts.callback;
    handleData.add = getDomArray(opts.add)[0];
    handleData.subtract = getDomArray(opts.subtract)[0];
    handleData.input = getDomArray(opts.input)[0];
    handleData.step = Number(opts.step);
    handleData.min = Number(opts.min);
    handleData.value = Number(opts.value) || 1;
    handleData.max = Number(opts.max);
    handleData.offClass = opts.offClass;
    handleData.isAsync = opts.isAsync;
    self.handleData = handleData;
};

// 初始化
AddSubtractInput.prototype.init = function () {
    this.render();
    this.power();
};

// 功能
AddSubtractInput.prototype.power = function () {
    const self = this;
    const handleData = self.handleData;
    self.handleValue(handleData.value);
    if (handleData.add) {
        handleData.add.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (!handleData.isAsync) {
                handleData.value += handleData.step;
                self.handleValue(handleData.value);
            } else {
                self.handleData.cbFnAsync({
                    self: self,
                    handleData: handleData,
                    step: handleData.step,
                    type: 'add',
                });
            }
        });
    }
    if (handleData.subtract) {
        handleData.subtract.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (!handleData.isAsync) {
                handleData.value -= handleData.step;
                self.handleValue(handleData.value);
            } else {
                self.handleData.cbFnAsync({
                    self: self,
                    handleData: handleData,
                    step: handleData.step,
                    type: 'subtract',
                });
            }
        });
    }
    if (handleData.input) {
        handleData.input.addEventListener('blur', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (!handleData.isAsync) {
                handleData.value = Number(this.value) || 1;
                self.handleValue(handleData.value);
            } else {
                self.handleData.cbFnAsync({
                    self: self,
                    handleData: handleData,
                    step: handleData.step,
                    type: 'blur',
                });
            }
        });
    }
};

// 处理value
AddSubtractInput.prototype.handleValue = function (value) {
    const self = this;
    const handleData = self.handleData;
    handleData.add && handleData.add.classList.remove(handleData.offClass);
    handleData.subtract && handleData.subtract.classList.remove(handleData.offClass);
    // 初始化结构
    if (handleData.max <= 0) {
        handleData.max = handleData.min;
    }
    if (value <= handleData.min) {
        value = handleData.min;
        handleData.subtract && handleData.subtract.classList.add(handleData.offClass);
    }
    if (value >= handleData.max) {
        value = handleData.max;
        handleData.add && handleData.add.classList.add(handleData.offClass);
    }
    if (value === handleData.min && value === handleData.max) {
        handleData.add && handleData.add.classList.add(handleData.offClass);
        handleData.subtract && handleData.subtract.classList.add(handleData.offClass);
        handleData.input && (handleData.input.readOnly = true);
    }
    handleData.input && (handleData.input.value = value);
    handleData.cbFn({min: handleData.min, max: handleData.max, value: value});
};

module.exports = AddSubtractInput;
