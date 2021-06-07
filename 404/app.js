const koa = require('koa');
const app = new koa();

app.use(async function pageNotFound(ctx) {
  ctx.status = 404;
  // Check if the given type(s) is acceptable, returning the best match when true, otherwise false
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page not Found';
  }
});

app.listen(8888, () => {
  console.log('Koa started to listen on port 3000');
})

module.exports = app;