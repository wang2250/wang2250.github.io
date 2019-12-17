const Koa = require('koa');

const path = require('path');
const Router = require('koa-router');
const ejs = require('koa-ejs');
const static = require('./static');
let server = new Koa();
server.listen(8080);



ejs(server,{
    root:path.resolve(__dirname,'template'),
    layout:false,
    viewExt:'ejs',
    cache:false,
    debug:false
})

let router = new Router();
router.get('/', async ctx=>{
    console.log('aa')
    await ctx.render('index',{
     
      });
})
static(router);//只要是文件结尾
server.use(router.routes());