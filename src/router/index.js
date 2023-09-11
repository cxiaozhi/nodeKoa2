const fs = require("fs");
const Router = require("koa-router");
const router = new Router();
fs.readdirSync(__dirname).forEach((dir) => {
    if (dir != "index.js") {
        let rObj = require("./" + dir);
        router.use(rObj.routes());
    }
});

module.exports = router;
