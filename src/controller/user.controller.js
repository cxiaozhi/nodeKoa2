const {createUser, getUserInfo} = require("@/service/user.service");
const {userRegistorError, userLoginError} = require("@/constant/err.type");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("@/config/config.default");
class UserController {
    // 注册
    async register(ctx, next) {
        const {user_name, password} = ctx.request.body;
        try {
            const res = await createUser(user_name, password);
            ctx.body = {
                code: 200,
                message: "用户注册成功",
                result: {
                    id: res.id,
                    user_name: res.user_name,
                },
            };
        } catch (error) {
            console.error(error);
            ctx.app.emit("error", userRegistorError, ctx);
        }
    }

    // 登录
    async login(ctx, next) {
        const {user_name, password} = ctx.request.body;
        // 获取用户信息 在token的playload中记录id uiser_name is_admin
        try {
            const {password, ...res} = await getUserInfo({user_name});
            ctx.body = {
                code: 0,
                message: "用户登录成功",
                result: {
                    token: jwt.sign(res, JWT_SECRET, {
                        expiresIn: "1d",
                    }),
                },
            };
        } catch (error) {
            console.error(error);
            ctx.app.emit("error", userLoginError, ctx);
        }
    }
}

// 不导出整个类 而是导出一个类的实例
module.exports = new UserController();
