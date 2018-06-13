const AddSubtractInput = require('../dist/index.min');
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
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 1,
    min: 1,
    value: 1,
    max: 6,
    offClass: '_off',
    isAsync: true, // 开启异步修改值
    asyncHandleValue: function (json) {
        // 异步的话，这里发送ajax，把数量和id带过去，请求完毕触发内部回调。
        setTimeout(function (res) {
            json.theCallbackMustBeTriggered(res.status === 'success'); // 异步修改值成功传入true,否则传入false
        }, 500, {status: 'success'});
    },
    callback: function (json) {
        console.log(json);
    },
});
