const Koa = require('koa');
const JSONStream = require('streaming-json-stringify');

const app = new Koa();

app.use(async function(ctx) {
  ctx.type = 'json';
  const stream = ctx.body = JSONStream();

  stream.on('error', ctx.onerror);

  setImmediate(function() {
    stream.write({
      id: 1
    });

    setImmediate(function() {
      stream.write({
        id: 2
      });

      setImmediate(function() {
        stream.end();
      });
    });
  })
})

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
});

module.exports = app;