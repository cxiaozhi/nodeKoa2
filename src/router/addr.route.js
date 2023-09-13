const Router = require("koa-router");

const {auth} = require("@/middleware/auth.middleware");
const {validator} = require("@/middleware/addr.middleware");
const {addAddress} = require("@/controller/addr.controller");

const router = new Router({prefix: "/address"});
// 添加地址
router.post(
    "/",
    auth,
    validator({
        consignee: "string",
        phone: {
            type: "string",
            format: /^1\d{10}$/,
        },
        address: "string",
    }),
    addAddress
);
module.exports = router;