const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = new Koa();

app.use(logger());
app.use(koaBody({ multipart: true }));

app.use(async function(ctx, next) {
  await next();
  if (ctx.body || !ctx.idempotent) return;
  ctx.redirect('/404.html');
});

app.use(serve(path.join(__dirname, '/public')));

app.use(async function(ctx, next) {
  if ('POST' != ctx.method) return await next();
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);

  ctx.redirect('/');
});

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;