const views = require('koa-views');
const path = require('path');

module.exports = views(path.join(__dirname, '/../views'), {
  map: { html: 'swig' } // 指定 swig-template 渲染模板
});