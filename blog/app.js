const render = require('./lib/render'); // 设置模板渲染
const logger = require('koa-logger');
const router = require('@koa/router')(); // router
const koaBody = require('koa-body'); // body parser

const Koa = require('koa');
const app = new Koa();

const posts = [];

app.use(logger());
app.use(render);
app.use(koaBody());

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

async function list(ctx) {
  await ctx.render('list', { posts });
}

async function add(ctx) {
  await ctx.render('new');
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post });
}

async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

app.listen(3000, () => {
  console.log('Koa started to listen on port 3000');
})

module.exports = app;