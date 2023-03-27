# Promise

> 整理自 [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/promise)、[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)、[MDN 使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

## 概述

**Promise** 对象用于表示一个异步操作的最终完成（或失败）及其结果值。

### 定义

``` js
    const promise = new Promise((resolve, reject) => {
        // ... some code

        if(/* 异步操作成功 */) {
            resolve(value);
        } else {
            reject(error);
        }
    })
```

**Promise** 构造函数接受一个函数作为参数，该函数的两个参数分别是 **resolve** 和 **reject**。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

**resolve** 函数的作用是，将 **Promise** 对象的状态从“待定”变为“已兑现”（即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

**reject** 函数的作用是，将 **Promise** 对象的状态从“待定”变为“已拒绝”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

**Promise** 能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来，它一定处于以下三种状态之一

- *待定（pending）*：初始状态，既没有被兑现，也没有被拒绝。
- *已兑现（fulfilled）*：意味着操作成功完成。
- *已拒绝（rejected）*：意味着操作失败。

> **已敲定**（settled）：终态，已兑现（fulfilled）或已拒绝（rejected）

所有的 promise 都一定是异步的。因此，一个已经处于 **已敲定** 状态的 promise 中的操作只有 promise 链式调用的栈被清空且一个时间片段过去之后才会被执行。这种效果跟 setTimeout(action, 10) 特别相似。

### 约定

- 在本轮 事件循环 运行完成之前，回调函数是不会被调用的。
- 即使异步操作已敲定（settled），在这之后通过 `then()` 添加的回调函数也会被调用。
- 通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序进行执行。
  
### 链式调用

![promise](promises.png)

如图所示，**Promise** 实例可以链式调用 `then()` 和 `catch()`，并且他们返回的是新的 promise 对象，可以继续链式调用。

- `then()` 的两个参数分别对应 **resolved** 状态和 **rejected** 状态的回调函数。
- `catch(failureCallback)` 是 `then(null/undefined, failureCallback)` 的缩略形式。
- `then()` 中缺少能够返回 promise 对象的函数时，链式调用就直接继续进行下一环操作。因此，链式调用可以在最后一个 .catch() 之前把所有的处理已拒绝状态的回调函数都省略掉。
  
<!-- ### Promise 拒绝事件 -->

## 静态方法

### `Promise.all(iterable)`

iterable 不是 promise 时，会调用`Promise.resolve()`，将其转换成 promise。

这个方法返回一个新的 promise 对象。

如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。

一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。

> - 当iterable中 有 **rejected** 时 不影响其他 iterable 项的执行。
> - 如果作为参数的 Promise 实例，自己定义了`catch()`方法，那么它一旦被rejected，并不会触发 `Promise.all()` 的`catch()`方法。由于实例的 `catch()` 返回了 **已兑现（fulfilled）**，`catch()` 的结果作为 `Promise.all()` 的 `then()` 的 result

### `Promise.allSettled(iterable)`

iterable 不是 promise 时，会调用`Promise.resolve()`，将其转换成 promise。

等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。

返回一个 promise，该 promise 在所有 promise 都 **已敲定** 后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。

> - 该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是fulfilled
> - results的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。

``` js
    // 异步操作成功时
    { status: 'fulfilled', value: value }

    // 异步操作失败时
    { status: 'rejected', reason: reason }
```

### `Promise.any(iterable)`

接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。

> 如果所有三个操作都变成rejected，那么await命令就会抛出错误。Promise.any()抛出的错误是一个 AggregateError 实例[（详见《对象的扩展》一章）](https://es6.ruanyifeng.com/#docs/object)，这个 AggregateError 实例对象的errors属性是一个数组，包含了所有成员的错误。

### `Promise.race(iterable)`

等到任意一个 promise 的状态变为 **已敲定**。

当 iterable 参数里的任意一个子 promise 成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应处理函数，并返回该 promise 对象。

### `Promise.reject(reason)`

返回一个状态为 **已拒绝** 的 Promise 对象，并将给定的失败信息传递给对应的处理函数。

### `Promise.resolve(value)`

value 是 **thenable** 的话，`Promise.resolve(value)`的返回结果由 value 的 `then()` 的结果决定；否则返回 resolved，并将 value 传递给 `Promise.resolve(value)` 的 then 方法

通常而言，如果你不知道一个值是否是 promise 对象，使用 `Promise.resolve(value)` 来返回一个 Promise 对象，这样就能将该 value 以 promise 对象形式使用。

```js
    Promise.resolve('foo')
    // 等价于
    new Promise(resolve => resolve('foo'))
```

1. 参数是一个 Promise 实例

    将不做任何修改、原封不动地返回这个实例。

2. 参数是一个thenable对象

    > **thenable** 对象指的是具有 `then()` 方法的对象。

    将这个对象转为 Promise 对象，然后就立即执行 **thenable** 对象的 `then()` 方法。

3. 参数不是具有 `then()` 方法的对象，或根本就不是对象

    返回一个新的 Promise 对象，状态为 **resolved**。

4. 不带有任何参数

    直接返回一个 **resolved** 状态的 Promise 对象。

## 实例方法

### `Promise.prototype.catch()`

为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。

### `Promise.prototype.then()`

为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，onFulfilled 或 onRejected 不是一个函数），则返回 promise 被敲定时的值。

### `Promise.prototype.finally()`

为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。

最后附上 [Promises/A+ 规范](https://promisesaplus.com/)
