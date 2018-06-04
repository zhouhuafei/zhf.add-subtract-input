# 加减输入框同步
```
const AddSubtractInput = require('zhf.add-subtract-input');
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 1,
    min: 1,
    value: 1,
    max: 6,
    offClass: '_off',
    callback: function (json) {
        console.log(json);
    },
});
```

# 加减输入框异步
```
const AddSubtractInput = require('zhf.add-subtract-input');
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 1,
    min: 1,
    value: 1,
    max: 6,
    offClass: '_off',
    isAsync: true,
    asyncHandleValue: function (json) {
        // 异步的话，这里发送ajax
        setTimeout(function (res) {
            console.log(res);
            const handleData = json.handleData;
            const step = handleData.step;
            let value = handleData.value;
            if (res.status === 'success') {
                if (json.type === 'add') {
                    value += step;
                } else if (json.type === 'subtract') {
                    value -= step;
                } else {
                    value = json.dom.value;
                }
                json.self.handleValue(value);
            } else {
                if (json.type === 'blur') {
                    json.self.handleValue(handleData.oldValue);
                }
            }
            json.theCallbackMustBeTriggered();
        }, 2000, {status: 'success'});
    },
    callback: function (json) {
        console.log(json);
    },
});
```
