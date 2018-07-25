const AddSubtractInput = require('../dist/index.min');
// 步长为1时，min表示最小购买数，所以不需要被纠正。但是会自动纠正非法的max和value。
// new AddSubtractInput({
//     add: '.js-add',
//     subtract: '.js-subtract',
//     input: '.js-input',
//     step: 1,
//     min: 1,
//     value: 1,
//     max: 6,
//     offClass: '_off',
//     callback: function (json) {
//         console.log(json);
//     },
// });

// 步长大于1时，表示必须按照步长的倍数购买。此时程序内部会自动纠正非法的min和max以及value
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 2,
    min: 2,
    value: 4,
    max: 12,
    offClass: '_off',
    isAsync: true, // 开启异步修改值
    asyncHandleValue: function (json) {
        // 异步的话，这里发送ajax，把数量和id带过去，请求完毕触发内部回调。
        setTimeout(function (res) {
            json.theCallbackMustBeTriggered(res.status === 'success'); // 异步修改值成功传入true,否则传入false
        }, 500, {status: 'success'});
    },
    callback: function (json) { // 数值被处理之后的回调
        console.log(json);
    },
    callbackSubtractBefore: function (json) { // 点击减的时候，数值未被处理之前的回调。
        console.log(json);
    },
});
