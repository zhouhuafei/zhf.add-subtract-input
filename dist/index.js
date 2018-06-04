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
        offClass: '_off',
        isAsync: false,
        asyncHandleValue: function asyncHandleValue() {// 异步加减输入框里的值
        },
        callback: function callback() {}
    }, opts);
    this.init();
}

// 渲染
AddSubtractInput.prototype.render = function () {
    var self = this;
    var opts = self.opts;
    var handleData = {};
    handleData.asyncHandleValue = opts.asyncHandleValue;
    handleData.cbFn = opts.callback;
    handleData.add = getDomArray(opts.add)[0];
    handleData.subtract = getDomArray(opts.subtract)[0];
    handleData.input = getDomArray(opts.input)[0];
    handleData.step = Number(opts.step);
    handleData.min = Number(opts.min);
    handleData.value = Number(opts.value) || 1;
    handleData.oldValue = handleData.value;
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
    var self = this;
    var handleData = self.handleData;
    if (!handleData.input || !handleData.add || !handleData.subtract) {
        return;
    }
    handleData.input.value = self.handleValue(handleData.value);
    self.handleStatus(handleData.value);
    handleData.add.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value += handleData.step;
        self.setInputValue();
    });
    handleData.subtract.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value -= handleData.step;
        self.setInputValue();
    });
    handleData.input.addEventListener('blur', function (ev) {
        var dom = this;
        ev.preventDefault();
        ev.stopPropagation();
        handleData.oldValue = handleData.value;
        handleData.value = Number(dom.value) || 1;
        self.setInputValue();
    });
};

// 处理value
AddSubtractInput.prototype.handleValue = function (value) {
    var self = this;
    var handleData = self.handleData;
    if (handleData.max <= 0) {
        handleData.max = handleData.min;
    }
    if (value <= handleData.min) {
        value = handleData.min;
    }
    if (value >= handleData.max) {
        value = handleData.max;
    }
    handleData.value = value; // 更新handleData上value的值，这个值贯穿全场。
    return value;
};

// 处理状态
AddSubtractInput.prototype.handleStatus = function (value) {
    var self = this;
    var handleData = self.handleData;
    // 初始化结构
    handleData.add && handleData.add.classList.remove(handleData.offClass);
    handleData.subtract && handleData.subtract.classList.remove(handleData.offClass);
    if (value <= handleData.min) {
        handleData.subtract && handleData.subtract.classList.add(handleData.offClass);
    }
    if (value >= handleData.max) {
        handleData.add && handleData.add.classList.add(handleData.offClass);
    }
    if (value === handleData.min && value === handleData.max) {
        handleData.add && handleData.add.classList.add(handleData.offClass);
        handleData.subtract && handleData.subtract.classList.add(handleData.offClass);
        handleData.input && (handleData.input.readOnly = true);
    }
};

// 设置input的value
AddSubtractInput.prototype.setInputValue = function () {
    var self = this;
    var handleData = self.handleData;
    if (!handleData.input || !handleData.add || !handleData.subtract) {
        return;
    }
    var value = self.handleValue(handleData.value);
    if (!handleData.isAsync) {
        // 同步
        self.handleStatus(value);
        handleData.input.value = value;
        handleData.cbFn({ min: handleData.min, max: handleData.max, value: value });
    } else {
        if (!handleData.isTriggerWhenAsync) {
            handleData.isTriggerWhenAsync = true;
            self.handleData.asyncHandleValue({
                self: self,
                handleData: handleData,
                theCallbackMustBeTriggered: function theCallbackMustBeTriggered(isSuccess) {
                    if (!isSuccess) {
                        // 异步修改输入框的值如果失败了，则还原以前的值。
                        value = handleData.oldValue;
                    }
                    handleData.value = value; // 更新handleData上value的值，这个值贯穿全场。
                    self.handleStatus(value);
                    handleData.input.value = value;
                    delete handleData.isTriggerWhenAsync;
                    handleData.cbFn({ min: handleData.min, max: handleData.max, value: value });
                }
            });
        }
    }
};

module.exports = AddSubtractInput;