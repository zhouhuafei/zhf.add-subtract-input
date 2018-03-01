# 加减输入框
```
const AddSubtractInput = require('zhf.add-subtract-input');
new AddSubtractInput({
    add: '.add',
    subtract: '.subtract',
    input: '.input',
    step: 1,
    min: 1,
    value: 1,
    max: 6,
    offClass: 'off',
    callback: function (json) {
        console.log(json);
    },
});
```
