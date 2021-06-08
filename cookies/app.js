const Koa = require('koa');
const app = new Koa();

app.use(async function(ctx) {
  const n = ~~ctx.cookies.get('view') + 1;
  ctx.cookies.set('view', n);
  ctx.body = n + ' views';
})


app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;