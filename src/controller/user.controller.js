const {createUser, getUserInfo} = require("@/service/user.service");
const {userRegistorError} = require("@/constant/err.type");
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
        ctx.body = "登录成功";
    }
}

// 不导出整个类 而是导出一个类的实例
module.exports = new UserController();
