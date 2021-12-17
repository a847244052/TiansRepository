/** object.create */
function myCreate(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

/** instanceOf */
function myInstanceOf(left, right) {
    let proto = Object.getPrototypeOf(left),
        protoType = right.prototype;
    while(true) {
        if (!proto)return false;
        if (proto === protoType)return true;
        proto = Object.getPrototypeOf(protp);
    }
}

/** 
 * new
 * 1.创建空对象
 * 2.设置原型，将对象的原型设置为函数的protoType对象
 * 3.让函数的this指向这个对象，执行构造函数的代码
 * 4.根据不同的返回值类型返回相应的值
 * 
 * Array.shift()删除首元素，并返回
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
 * apply 数组  call 参数排列
 * 
*/
function objectFactory() {
    let newObject = null;
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;
    if (typeof constructor !== 'function') {
        console.log('type error');
        return;
    }
    newObject = Object.create(constructor.prototype);
    result = constructor.apply(newObject, arguments);
    let flag = result && (typeof result === 'object' || typeof result === 'function');
    return flag ? result : newObject;
}

/** 
 * promise
 * 
 * 当我们不在 then 中放入参数，
 * promise.then().then()，那么其后面的 then 依旧可以得到之前 then 返回的值，
 * 这就是所谓的值的穿透。
 * 
 * promise 没有中断方法
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECED = 'REJECED';

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    let called;
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x);
    }
}

class MyPromise{
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = reason => {
            if (this.status = PENDING) {
                this.status = REJECED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch(error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error};
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        });
        return promise2;
    }
}

MyPromise.prototype.finally = function(callback) {
    return this.then(
        value => {
        return Promise.resolve(callback()).then(() =>value);
    }, reason => {
        return Promise.resolve(callback()).then(() => {throw reason})
    });
}

MyPromise.all = function(values) {
    if (!Array.isArray(valus)) {
        const tyoe = typeof values;
        return new TypeError(`TypeError: ${type} ${valus} is not iterable`);
    }

    return new Promise((resolve, reject) => {
        let resArr = [];
        let orderIndex = 0;
        const processResultByKey = (value, index) => {
            resArr[index] = value;
            if (++orderIndex === valus.length) {
                resolve(resArr);
            }
        }

        for(let i = 0; i < values.length; i++) {
            let value = values[i];
            if (value && typeof value.then === 'function') {
                value.then(value => {
                    processResultByKey(value, i);
                }, reject);
            } else {
                processResultByKey(value, i);
            }
        }
    })
}

MyPromise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
            let val = promises[i];
            if (val && typeof val.then === 'function') {
                val.then(resolve, reject);;
            } else {
                resolve(val);
            }
        }
    })
}

/**
 * 深拷贝
 * 1.JSON.parse(JSON.stringfy(obj))
 * 拷贝的对象如果有函数，undefined，symbol，会消失
 * 
 * 2.lodash的 cloneDeep
 * 
 * 3.递归实现
 */

function deepClone(object) {
    if (!object || typeof object !== 'object') return;
    let newObject = Array.isArray(object) ? [] : {};
    for(let key in newObject) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = 
            typeof object[key] === 'object' ? deepClone(object[key]) : object[key];
        }
    }
    return newObject;
}
