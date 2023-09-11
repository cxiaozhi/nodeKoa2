const Router = require("koa-router");

const router = new Router({prefix: "/goods"});

const {upload, releaseGoods} = require("@/controller/goods.controller");

const {auth, hadAdminPermission} = require("@/middleware/auth.middleware");

const {validator} = require("@/middleware/goods.middleware");
// 上传图片
router.post("/upload", auth, hadAdminPermission, upload);

// 发布商品
router.post("/", auth, hadAdminPermission, validator, releaseGoods);

module.exports = router;
