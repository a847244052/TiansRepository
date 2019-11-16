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