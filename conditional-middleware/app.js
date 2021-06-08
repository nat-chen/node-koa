const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();

function ignoreAssets(mw) {
  return async function(ctx, next) {
    if (/(\.js|\.css|\.ico)$/.test(ctx.path)) {
      await next(); // 跳过 logger 中间件，直接设置 ctx.body
    } else {
      await mw.call(this, ctx, next); // 执行 logger 中间
    }
  }
}

app.use(ignoreAssets(logger()));

app.use(async function(ctx) {
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;


