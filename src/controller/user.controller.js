const {createUser} = require("@/service/user.service");

class UserController {
    // 注册
    async register(ctx, next) {
        const {user_name, password} = ctx.request.body;
        ctx.body = await createUser(user_name, password);
    }

    // 登录
    async login(ctx, next) {
        ctx.body = "登录成功";
    }
}

// 不导出整个类 而是导出一个类的实例
module.exports = new UserController();
