const bcrypt = require("bcryptjs");

const {getUserInfo} = require("@/service/user.service");
const {
    userFormateError,
    userAlreadyExited,
    userRegistorError,
    userDoesNotExistError,
    userLoginError,
    userPasswordError,
} = require("@/constant/err.type");

// 用户名和密码 校验
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

// 检验用户是否存在
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

// 加密
const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body;
    // 生成盐
    const salt = bcrypt.genSaltSync(10);
    // 加盐
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;
    await next();
};

// 用户登录校验
const verifyLogin = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    try {
        // 1. 判断用户是否存在
        const res = await getUserInfo({user_name});
        if (!res) {
            console.error("用户不存在", {user_name});
            ctx.app.emit("error", userDoesNotExistError, ctx);
            return;
        }

        // 2. 判断密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit("error", userPasswordError, ctx);
            return;
        }
    } catch (error) {
        console.error(error);
        ctx.app.emit("error", userLoginError, ctx);
        return;
    }

    await next();
};
module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
};
