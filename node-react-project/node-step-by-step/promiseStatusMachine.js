(function(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(3);  // reject(new Error(3))
        }, 500);
    }).then(function(res){ // then and catch return new promise accordingto return or throw
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })

    console.log(promise); //Promise{<pengding>}

    setTimeout(() => {
        console.log(promise) //Promise{<resolve: undefine>}
    }, 800);
})();
// chrome run 
