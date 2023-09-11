const koa = require("koa");
const app = new koa();

const router = require("@/router/index");
const {koaBody} = require("koa-body");
const errHandle = require("./errHandle");
// 中间件
// 解析body数据 重写 中间件
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
// 统一错误处理
app.on("error", errHandle);
module.exports = app;
