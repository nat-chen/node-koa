const Koa = require('koa');
const rawBody = require('raw-body');
const session = require('koa-session');

const app = new Koa();

app.keys = ['key1', 'key2'];
app.use(session(app));

app.use(async function(ctx, next) {
  if (ctx.method !== 'GET' || ctx.path !== '/messages') return await next();
  const messages = ctx.session.messages || [];
  ctx.body = messages;
  delete ctx.session.messages;
});

app.use(async function(ctx, next) {
  if (ctx.method !== 'POST' || ctx.path !== '/messages') return await next();
  const message = await rawBody(ctx.req, {
    encoding: 'utf8'
  });
  ctx.session.messages = ctx.session.message || [];
  ctx.session.messages.push(message);
  ctx.status = 204;
})

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;
