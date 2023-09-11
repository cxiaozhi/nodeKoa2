const Router = require("koa-router");
const router = new Router({prefix: "/users"});
const {register, login} = require("@/controller/user.controller");
const {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
} = require("@/middleware/user.middleware");

/**
 * GET /user/
 * 注册
 */
router.post("/register", userValidator, verifyUser, cryptPassword, register);
router.post("/login", userValidator, verifyLogin, login);

module.exports = router;
