const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("@/config/config.default");
const {tokenError} = require("@/constant/err.type");

// 鉴权
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

module.exports = {
    auth,
};
