const Router = require("koa-router");

const {auth} = require("@/middleware/auth.middleware");
const {validator} = require("@/middleware/cart.middleware");
const {addCart, getCart} = require("@/controller/cart.controller");

const router = new Router({prefix: "/carts"});

// 添加购物车
router.post("/", auth, validator, addCart);

// 购物车列表
router.get("/", auth, getCart);
module.exports = router;
