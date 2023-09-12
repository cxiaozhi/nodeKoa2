const Router = require("koa-router");

const router = new Router({prefix: "/goods"});

const {
    upload,
    releaseGoods,
    updateGoods,
} = require("@/controller/goods.controller");

const {auth, hadAdminPermission} = require("@/middleware/auth.middleware");

const {validator} = require("@/middleware/goods.middleware");
const {CITEXT} = require("sequelize");
// 上传图片
router.post("/upload", auth, hadAdminPermission, upload);

// 发布商品
router.post("/", auth, hadAdminPermission, validator, releaseGoods);

// 修改商品
router.put("/:id", auth, hadAdminPermission, validator, updateGoods);

module.exports = router;
