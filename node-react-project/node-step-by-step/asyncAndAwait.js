// async function 是 Promise 的语法糖封装
// 异步编程终极解决方案，以同步方式写异步
// await关键字可以暂停async function 的执行
// await关键字可以以同步的写法获取Promise的执行结果
// try-catch可以获取await所得到的错误
(async function() {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        // await Promise.all([interview(1), interview(2)])
    } catch (e) {
        return console.log('cry at ' + e.round);
    }
    console.log('smile');

})();
function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve('success')
            } else {
                var error = new Error('fail');
                error.round = round;
                reject(error);
            }
        }, 500)
    })
}   