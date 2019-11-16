const eventloop = {
    queue: [],

    loop() {
        while (this.queue.length) {
            const callback = this.queue.shift(); //删除并返回数组的第一个元素
            callback();
        }

        setTimeout(
            this.loop.bind(this), 50
        )
    },

    add(callback) {
        this.queue.push(callback);
    }
}

eventloop.loop();

setTimeout(() => {
    eventloop.add(() => {
        console.log(1);
    })
}, 500);
setTimeout(() => {
    eventloop.add(() => {
        console.log(2);
    })
}, 800);