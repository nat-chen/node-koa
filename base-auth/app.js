const Koa = require('koa');
const auth = require('koa-basic-auth');

const app = new Koa();

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

app.use(auth({ name: 'tj', pass: 'tobii' }));

app.use(async function(ctx) {
  ctx.body = {
    text: 'secret'
  };
});

app.listen(8888, () => {
  console.log('Listen on port 8888');
})

module.exports = app;