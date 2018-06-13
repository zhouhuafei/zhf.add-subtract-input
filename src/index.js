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
        asyncHandleValue: function () { // 异步加减输入框里的值
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
    handleData.asyncHandleValue = opts.asyncHandleValue;
    handleData.cbFn = opts.callback;
    handleData.add = getDomArray(opts.add)[0];
    handleData.subtract = getDomArray(opts.subtract)[0];
    handleData.input = getDomArray(opts.input)[0];
    // step 最小为1
    const step = Number(opts.step) || 1;
    handleData.step = step < 1 ? 1 : step;
    // min 最小为1
    const min = Number(opts.min) || 1;
    handleData.min = min < 1 ? 1 : min;
    // value 最小为1
    const value = Number(opts.value) || 1;
    handleData.value = value < 1 ? 1 : value;
    handleData.oldValue = handleData.value;
    // max 最小为1
    const max = Number(opts.max) || 1;
    handleData.max = max < 1 ? 1 : max;
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
    if (!handleData.input || !handleData.add || !handleData.subtract) {
        return;
    }
    handleData.input.value = self.handleValue(); // 初始化值
    self.handleStatus(); // 初始化状态
    // 加
    handleData.add.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value += handleData.step;
        self.setInputValue(this);
    });
    // 减
    handleData.subtract.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value -= handleData.step;
        self.setInputValue(this);
    });
    // 直接改值
    handleData.input.addEventListener('blur', function (ev) {
        const dom = this;
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value = Number(dom.value) || 1;
        self.setInputValue(this);
    });
};

// 纠正value，当步长不为1，则表明购买必须按照步长的倍数进行购买
AddSubtractInput.prototype.redressValue = function () {
    const self = this;
    const handleData = self.handleData;
    const step = handleData.step;
    const max = handleData.max;
    const value = handleData.value;
    if (step > 1) {
        handleData.min = step; // 纠正min，如果值和步长不是倍数关系，则自动纠正
        handleData.max = max - max % step; // 纠正max，如果值和步长不是倍数关系，则自动纠正
        handleData.value = Math.floor(value / step) * step; // 纠正value，如果值和步长不是倍数关系，则自动纠正
    }
};

// 处理value
AddSubtractInput.prototype.handleValue = function () {
    const self = this;
    self.redressValue();
    const handleData = self.handleData;
    let value = handleData.value;
    if (handleData.max < handleData.min) { // max小于最小值则等于最小值
        handleData.max = handleData.min;
    }
    if (value < handleData.min) {
        value = handleData.min;
    }
    if (value > handleData.max) {
        value = handleData.max;
    }
    handleData.value = value; // 更新handleData上value的值，这个值贯穿全场。
    return value;
};

// 处理状态
AddSubtractInput.prototype.handleStatus = function () {
    const self = this;
    self.redressValue();
    const handleData = self.handleData;
    const value = handleData.value;
    // 初始化结构
    handleData.add.classList.remove(handleData.offClass);
    handleData.subtract.classList.remove(handleData.offClass);
    if (value <= handleData.min) {
        handleData.subtract.classList.add(handleData.offClass);
    }
    if (value >= handleData.max) {
        handleData.add.classList.add(handleData.offClass);
    }
    if (handleData.min === handleData.max) {
        handleData.add.classList.add(handleData.offClass);
        handleData.subtract.classList.add(handleData.offClass);
        handleData.input.readOnly = true;
    }
};

// 设置input的value
AddSubtractInput.prototype.setInputValue = function (dom) {
    const self = this;
    const handleData = self.handleData;
    if (!handleData.input || !handleData.add || !handleData.subtract) {
        return;
    }
    let value = self.handleValue();
    if (!handleData.isAsync) { // 同步
        self.handleStatus();
        handleData.input.value = value;
        handleData.cbFn({min: handleData.min, max: handleData.max, value: value});
    } else {
        if (!handleData.isTriggerWhenAsync) {
            handleData.isTriggerWhenAsync = true;
            self.handleData.asyncHandleValue({
                self: self,
                handleData: handleData,
                dom: dom,
                theCallbackMustBeTriggered: function (isSuccess) {
                    if (!isSuccess) { // 异步修改输入框的值如果失败了，则还原以前的值。
                        value = handleData.oldValue;
                    }
                    handleData.value = value; // 更新handleData上value的值，这个值贯穿全场。
                    self.handleStatus();
                    handleData.input.value = value;
                    delete handleData.isTriggerWhenAsync;
                    handleData.cbFn({min: handleData.min, max: handleData.max, value: value});
                },
            });
        }
    }
};

module.exports = AddSubtractInput;
