# 加减输入框
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
