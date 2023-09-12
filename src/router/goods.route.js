const Router = require("koa-router");

const router = new Router({prefix: "/goods"});

const {
    upload,
    releaseGoods,
    updateGoods,
    removeGoods,
    offGoods,
    restoreGoods,
    findAllGoods,
} = require("@/controller/goods.controller");

const {auth, hadAdminPermission} = require("@/middleware/auth.middleware");

const {validator} = require("@/middleware/goods.middleware");

// 上传图片
router.post("/upload", auth, hadAdminPermission, upload);

// 发布商品
router.post("/", auth, hadAdminPermission, validator, releaseGoods);

// 修改商品
router.put("/:id", auth, hadAdminPermission, validator, updateGoods);

// 删除商品
router.delete("/:id", auth, hadAdminPermission, removeGoods);

// 下架商品
router.post("/:id/off", auth, hadAdminPermission, offGoods);

// 上架商品
router.post("/:id/on", auth, hadAdminPermission, restoreGoods);

// 获取商品列表
router.get("/", findAllGoods);

module.exports = router;
