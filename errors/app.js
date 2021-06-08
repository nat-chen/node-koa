const Koa = require('koa');
const app = new Koa();

// 执行顺序 1 3 2 4
app.use(async function(ctx, next) {
  try {
    console.log(1);
    await next();
  } catch (err) {
    console.log(2)
    ctx.status = err.status | 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact Maru</p>';
    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});

app.use(async function() {
  console.log(3);
  throw new Error('boom boom');
});

app.on('error', function(err) {
  console.log(4)
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
})

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;

