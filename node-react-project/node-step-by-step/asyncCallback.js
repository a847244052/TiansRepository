import { resolve } from "dns";

 interview(function(err) {
     console.log('second?')
     if (err) {
         return console.log('cry');
     }
     console.log('smile');
 })
 
 function interview(callback){
     console.log('first?')
    setTimeout(() => {
        if(Math.random() < 0.8) {
            callback(null, 'success');
        } else {
            callback(new Error('fail'));
        }
    }, 500)
 }

 // promise
 (function() {
     var promise = interview(1)
        .then(() => {
            return interview(2)
        })
        .then(() => {
            return interview(3)
        })
        .then(() => {
            console.log('smile')
        })
        .catch((err) => {
            console.log('cry at ' + err.round + ' round');
        });

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
 })();

 Promise.all([
     interview('tencent'),
     interview('bilibili')
 ]).then(() => {
     console.log('smile'); // 会等两个都执行完才进行回调
 }).catch((err) => {
     console.log('cry for ' + err.round); // 如果两个都失败了只会捕获到第一个promise的error
 })