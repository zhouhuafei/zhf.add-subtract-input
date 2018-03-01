const AddSubtractInput = require('../dist/index.min');
new AddSubtractInput({
    add: '.add',
    subtract: '.subtract',
    input: '.input',
    step: 2,
    min: 99999999,
    value: 2,
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
});
