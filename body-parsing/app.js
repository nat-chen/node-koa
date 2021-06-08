const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  jsonLimit: '1kb'
}));

app.use(async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(404, '.name required');
  ctx.body = { name: body.name.toUpperCase() }
})

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
})

module.exports = app;