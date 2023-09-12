const Router = require("koa-router");

const {auth} = require("@/middleware/auth.middleware");
const {validator} = require("@/middleware/cart.middleware");
const {
    addCart,
    getCart,
    updateCart,
    removeCart,
} = require("@/controller/cart.controller");

const router = new Router({prefix: "/carts"});

// 添加购物车
router.post("/", auth, validator({goods_id: "number"}), addCart);

// 购物车列表
router.get("/", auth, getCart);

// 更新购物车
router.patch(
    "/:id",
    auth,
    validator({
        number: {
            type: "number",
            required: false,
        },
        selected: {
            type: "bool",
            required: false,
        },
    }),
    updateCart
);

// 删除购物车
router.delete("/", auth, validator({ids: "array"}), removeCart);
module.exports = router;
