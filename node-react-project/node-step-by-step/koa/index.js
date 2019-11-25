const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount');

var playerWinCount = 0;
var lastPlayerAction = null;
var sameCount = 0;

const app = new koa();

app.use(
    mount('/favicon.ico', function (ctx) {
        ctx.status = 200;
    })
)

const gameKoa = new koa();
app.use(
    mount('/game', gameKoa)
)
gameKoa.use(
    async function (ctx, next) {
        if (playerWinCount >= 3) {
            ctx.status = 500;
            ctx.body = '我不会再玩了！';
            return;
        }
        await next();

        if (ctx.playerWon) {
            playerWinCount++;
        }
    }
)
gameKoa.use(
    async function (ctx, next) {
        const query = ctx.query;
        const playerAction = query.action;
        if (!playerAction) {
            ctx.status = 400;
            return;
        }
        if (sameCount == 9) {
            ctx.status = 500;
            ctx.body = '我不会再玩了！';
        }

        if (lastPlayerAction == playerAction) {
            sameCount++;
            if (sameCount >= 3) {
                ctx.status = 400;
                ctx.body = '你作弊，我再也不玩了！';
                sameCount = 9;
                return;
            }
        } else {
            sameCount = 0;
        }
        lastPlayerAction = playerAction;
        ctx.playerAction = playerAction;
        await next();
    }
)

gameKoa.use(
    async function (ctx, next) {
        const playerAction = ctx.playerAction;
        const result = game(playerAction);

        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200;
                if (result == 0) {
                    ctx.body = '平局';
                } else if (result == -1) {
                    ctx.body = '你输了';
                } else {
                    ctx.body = '你赢了';
                    ctx.playerWon = true;
                }
                resolve();
            }, 500);
        })
    }
)

app.use(
    mount('/', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    })
)
app.listen(3000);


// 我一直不理解koa的next执行顺序 找到这个例子  把顺序换一下就明白了 next其实也是按照顺序执行
const Koa = require('koa');
const app = new Koa();
let arr;
app.use(async(ctx, next) => {
    arr = [];
    arr.push(1);
    await next();
    arr.push(2);
});
app.use(async(ctx, next) => {
    arr.push(3);
    await next();
    arr.push(4);
});
app.use(async(ctx, next) => {
    arr.push(5);
    await next();
    arr.push(6);
});
app.use(async(ctx, next) => {
    arr.push(7);
    ctx.body = arr;
});
app.listen(3000, () => {
})