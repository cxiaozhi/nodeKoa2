const {getUserInfo} = require("@/service/user.service");
const {
    userFormateError,
    userAlreadyExited,
    userRegistorError,
} = require("@/constant/err.type");
const userValidator = async function (ctx, next) {
    const {user_name, password} = ctx.request.body;
    // 合法性
    if (!user_name || !password) {
        console.error("用户名或密码为空", ctx.request.body);
        ctx.app.emit("error", userFormateError, ctx);
        return;
    }
    await next();
};

const verifyUser = async function (ctx, next) {
    const {user_name, password} = ctx.request.body;
    try {
        // 合理性
        // 先查询用户名是否存在
        const res = await getUserInfo({user_name});
        if (res) {
            console.error("用户名已存在", {user_name});
            ctx.app.emit("error", userAlreadyExited, ctx);
            return;
        }
    } catch (error) {
        console.error(error);
        ctx.app.emit("error", userRegistorError, ctx);
        return;
    }
    await next();
};

module.exports = {
    userValidator,
    verifyUser,
};
