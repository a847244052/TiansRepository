# Array 常用方法整理

## 构造函数

### Array()

``` js
new Array(element0, element1, /* … ,*/ elementN)
new Array(arrayLength)

Array(element0, element1, /* … ,*/ elementN)
Array(arrayLength)
```

单个数字参数时，作为新数组的长度；单个非数字参数或多个参数时，作为新数组的元素。

调用 `Array()` 时可以使用或不使用 new。两者都会创建一个新的数组。

---

## 静态方法

### Array.of()

``` js
Array.of(1);         // [1]
Array.of(1, 2, 3);   // [1, 2, 3]
Array.of(undefined); // [undefined]
Array(6);            // [empty * 6]
```

与 `Array()` 构造函数对比，`Array.of()` 参数都作为新数组的元素。 `Array.of(number)` 接收单个参数时创建一个具有单个元素 number 的数组；而 `Array(number)` 创建一个长度为 number ( number 个数的空槽) 的数组。

---

### Array.from()

`Array.from()` 从**可迭代**或**类数组**对象创建一个新的**浅拷贝**的数组实例

``` js
// arrayLike 类数组或可迭代对象
Array.from(arrayLike)

// mapFn(element, index) 对每个元素调用进行处理，返回值添加到数组中
Array.from(arrayLike, mapFn)

// thisArg 执行 mapFn 时的 this
Array.from(arrayLike, mapFn, thisArg)

Array.from('foo')                       // ["f", "o", "o"]
Array.from([1, 2, 3], x => x + x)       // [2, 4, 6]
```

> - 可迭代对象：实现了 Symbol.iterator 接口
> - 类数组对象：有 length 属性
> - `Array.from(obj, mapFn, thisArg)` 和 `Array.from(obj).map(mapFn, thisArg)` 具有相同的结果，只是它不会创建中间数组，并且 mapFn 仅接受两个参数（element、index），不接受数组，因为数组仍然在构建中
> - `Array.from()` 绝不会创建稀疏数组。如果 arrayLike 对象缺少一些索引属性，那么这些属性在新数组中将是 `undefined`。

---

## 原型函数

### 查询函数

#### Array.prototype.at()

```js
includes(searchElement)
// 从fromIndex 索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜（即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
includes(searchElement, fromIndex)
```

接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

> - 在传递非负数时，`at()` 方法等价于括号表示法。
> - 当 index < 0 时，该方法将访问索引 index + array.length。

---

#### Array.prototype.includes()

```js
indexOf(searchElement)
// 从fromIndex 索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜（即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
indexOf(searchElement, fromIndex)
```

判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

> - 使用 `includes()` 比较字符串和字符串时是区分大小写的。
> - 如果 如果 `fromIndex >= array.length` ，则将直接返回 `false，且不搜索该数组。`
> - 如果 `frommindex < 0`，从 `fromIndex + array.length` 开始搜索 `searchElement` 。如果计算出的索引小于 0 或者省略了 `fromIndex` ，则整个数组都会被搜索。

---

#### Array.prototype.indexOf()

```js
indexOf(searchElement)
indexOf(searchElement, fromIndex)
```

返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。

> - `indexOf` 使用全等运算（与 ===，或称为三等号运算符的方法相同）判断 `searchElement` 与数组中包含的元素之间的关系。
> - 如果 `fromIndex >= array.length`，数组不会继续搜索并返回 -1。
> - 如果 `frommindex < 0`，从 `fromIndex + array.length` 开始搜索 `searchElement`；如果计算出的索引小于 0 或者省略了 `fromIndex` ，则整个数组被搜索。

---

#### Array.prototype.some()

```js
// callbackFn(element, index, array)
some(callbackFn)
some(callbackFn, thisArg)
```

测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 `Boolean` 类型的值。

> - `some()` 为数组中的每一个元素执行一次 `callbackFn` 函数，直到找到一个使得 `callbackFn` 返回一个“真值”（即可转换为布尔值 `true` 的值）。如果找到了这样一个值，`some()` 将会立即返回 `true`。否则，`some()` 返回 `false。`
> - `callbackFn` 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
> - `some()` 被调用时不会改变数组。
> - 如果用一个空数组进行测试，在任何情况下它返回的都是 `false`。

---

### 查询函数总结

TODO: conclusion 避免在 `callbackFn` 中修改原数组

1. `find()` 匹配第一个元素。
2. 如果需要在数组中找到对应元素的索引，使用 `findIndex()` 或 `indexOf()`， 它们功能类似，`indexOf()` 是检查每个元素是否与值相等； `findIndex()` 使用测试函数。
3. 数组中最后一个匹配元素的索引，使用 `findLastIndex()`。
4. 以上 "find" 开头的函数， `callbackFn` 被调用来处理数组的每一个索引，而不仅仅是那些有值的索引。在稀疏数组中，未赋值的空槽与 `undefined` 表现相同。
  
> - 如果需要查找数组中是否存在某个值，请使用 `includes()`。同样，它检查每个元素是否与值相等，而不是使用测试函数。
> - 如果需要查找是否有元素满足所提供的测试函数，请使用 `some()`。

---

### 改变原数组的函数

#### Array.prototype.splice()

TODO: 画图

```js
// start 指定修改的开始位置（从 0 计数）。如果超出了数组的长度，则从数组末尾开始添加内容;如果是负值，则表示从数组末位开始的第几位(等价于 array.length-n);如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。
splice(start)
// deleteCount 整数，表示要移除的数组元素的个数。如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
splice(start, deleteCount)
// item1, item2, itemN 要添加进数组的元素，从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```

通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。

> - 返回值由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

#### Array.prototype.fill()

用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组。

```js
fill(value)
TODO: 画图
// start 和 end 非负数参数需要在长度范围内才有意义，负数参数需要和 length 相加结果在长度范围内有意义
fill(value, start)
fill(value, start, end)
```

#### Array.prototype.pop()

从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。

#### Array.prototype.push()

将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

#### Array.prototype.reverse()

将数组中元素的位置颠倒，并返回该数组

#### Array.prototype.shift()

从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度，如果数组为空则返回undefined 。

#### Array.prototype.unshift()

将一个或多个元素添加到数组的开头，并返回该数组的新长度。

#### Array.prototype.sort()

用 [原地算法](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95) 对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的。

```js
sort()
sort(compareFn)
```

| compareFn(a, b) 返回值 | 排序顺序 |
| ----------- | ----------- |
| > 0 | a 在 b 后 |
| < 0 | a 在 b 前 |
| === 0 | 顺序不变 |

### 返回新数组

#### Array.prototype.concat()

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
// 数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。
concat()
concat(value0)
concat(value0, value1)
concat(value0, value1, /* … ,*/ valueN)
```

> - 如果任何源数组是稀疏数组，concat() 方法会保留空槽。

#### Array.prototype.flat()

创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。

```js
flat()
// depth 默认值为 1
flat(depth)
```

> - 不会改变 this 数组，而是返回一个浅拷贝，该浅拷贝包含了原始数组中相同的元素。
> - 如果待展开的数组是稀疏的，flat() 方法会忽略其中的空槽；如果 depth 是 1，那么根数组和第一层嵌套数组中的空槽都会被忽略。

#### Array.prototype.slice()

返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
TODO: 画图

### 遍历

#### Array.prototype.forEach() TODO: 详细一点 比如参数用以下边复用

对数组的每个元素执行一次给定的函数。

#### Array.prototype.entries()

返回一个新的数组迭代器对象，该对象包含数组中每个索引的键/值对。

> - 当在稀疏数组上使用时，entries() 方法迭代空槽，就像它们的值为 undefined 一样。

#### Array.prototype.every()

测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

> - every() 方法是一个迭代方法。它为数组中的每个元素调用一次指定的 callbackFn 函数，直到 callbackFn 返回一个假值。如果找到这样的元素，every() 方法将会立即返回 false 并停止遍历数组。否则，如果 callbackFn 为每个元素返回一个真值，every() 就会返回 true。
> - 对于空数组，它只返回 true。
> - `callbackFn` 仅针对已分配值的数组索引调用。它不会为稀疏数组中的空槽调用。

#### Array.prototype.filter()

创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

> - 如果没有任何数组元素通过测试，则返回空数组。

#### Array.prototype.map()

创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

> - `callbackFn` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
> - 不打算使用返回的新数组或没有从回调函数中返回值，不适合使用 `map()`

#### Array.prototype.reduce() TODO:

### 其他

#### Array.prototype.join()

将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。

```js
join()
// separator 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔。如果 separator 是空字符串（""），则所有元素之间都没有任何字符。
join(separator)
```

> - 如果数组只有一个元素，那么将返回该元素而不使用分隔符。
> - 如果 `arr.length` 为 0，则返回空字符串。
> - 如果一个元素是 undefined 或 null，它将被转换为空字符串，而不是字符串 "undefined" 或 "null"。
> - 当在稀疏数组上使用时，join() 方法迭代空槽，就像它们的值为 undefined 一样。
