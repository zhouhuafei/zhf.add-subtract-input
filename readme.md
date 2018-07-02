# 加减输入框同步
```
const AddSubtractInput = require('zhf.add-subtract-input');

// 步长为1时，min表示最小购买数。会自动纠正非法的max和value。
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 1,
    min: 1,
    value: 1,
    max: 6,
    offClass: '--off',
    callback: function (json) {
        console.log(json);
    },
});
```

# 加减输入框异步
```
const AddSubtractInput = require('zhf.add-subtract-input');

// 步长大于1时，表示必须按照步长的倍数购买。此时程序内部会自动纠正非法的min和max以及value
// 当step大于1时，min参数会被强制纠正为step的值，所以当step不为1时，min参数可以不传参。但是还是建议加上，因为程序内部会自行纠正且并不是所有商品step都大于1。
new AddSubtractInput({
    add: '.js-add',
    subtract: '.js-subtract',
    input: '.js-input',
    step: 3,
    min: 3,
    value: 6,
    max: 9,
    offClass: '--off',
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
```

* 最小购买数不能因为库存(max)是0就变成0，因为两个属性是独立的。例如商品最小购买数是50，库存只有20了，则用户是不能购买这个商品，而不是把最小购买数变成20。所以这种情况，前台的展现上肯定是在输入框里把最小购买数50展现出来且商品不可购买，而不是因为库存的减少，去更改最小购买数。
