const path = require("path");

const koa = require("koa");
const app = new koa();
const koaStatic = require("koa-static");
const parameter = require("koa-parameter");

const router = require("@/router/index");
const {koaBody} = require("koa-body");
const errHandle = require("./errHandle");
// 中间件
// 解析body数据 重写 中间件
app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(process.cwd(), "/src/upload"),
            keepExtensions: true,
        },
        parsedMethods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    })
);

app.use(koaStatic(path.join(process.cwd(), "/src/upload")));

app.use(parameter(app));
app.use(router.routes());
app.use(router.allowedMethods());

// 统一错误处理
app.on("error", errHandle);
module.exports = app;
