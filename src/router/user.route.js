const Router = require("koa-router");
const router = new Router({prefix: "/users"});
const {register, login} = require("@/controller/user.controller");
const {userValidator, verifyUser} = require("@/middleware/user.middleware");
/**
 * GET /user/
 * 注册
 */
router.post("/register", userValidator, verifyUser, register);
router.post("/login", login);

module.exports = router;
