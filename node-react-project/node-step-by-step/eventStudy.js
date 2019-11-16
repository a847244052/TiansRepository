const EventEmitter = require('events').EventEmitter;

class Tian extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('theTime', {
                time: new Date()
            });
        }, 3000)
    }
}

const tian = new Tian;

tian.addListener('theTime', (res) => {
    console.log('period study time!', res)
})