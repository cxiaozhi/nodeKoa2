const koa = require("koa");
const app = new koa();

const userRouter = require("@/router/user.route");
const {koaBody} = require("koa-body");

// 中间件
// 解析body数据 重写 中间件
app.use(koaBody());
app.use(userRouter.routes());

module.exports = app;
