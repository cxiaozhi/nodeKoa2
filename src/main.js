const moduleAlias = require("module-alias");
moduleAlias.addAlias("@", __dirname, "/src");
const {APP_PORT} = require("@/config/config.default");
const koaApp = require("@/app/index");
koaApp.listen(APP_PORT, () => {
    console.log(`服务器已启动: http://localhost:${APP_PORT}`);
});
