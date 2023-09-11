const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("@/config/config.default");
const {tokenError, hadAdminPermissionError} = require("@/constant/err.type");

// 是否登录
const auth = async function (ctx, next) {
    try {
        const {authorization} = ctx.request.header;
        const token = authorization.replace("Bearer ", "");
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
    } catch (error) {
        console.error(error);
        return ctx.app.emit("error", tokenError, ctx);
    }
    await next();
};

// 是否是管理员
const hadAdminPermission = async function (ctx, next) {
    const {is_admin} = ctx.state.user;
    if (!is_admin) {
        console.error("该用户没有管理权限", ctx.state.user);
        return ctx.app.emit("error", hadAdminPermissionError, ctx);
    }
    await next();
};

module.exports = {
    auth,
    hadAdminPermission,
};
