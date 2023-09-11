const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("@/config/config.default");
const {tokenError} = require("@/constant/err.type");
const auth = async function (ctx, next) {
    try {
        const {authorization} = ctx.request.header;
        const token = authorization.replace("Bearer ", "");
        const user = jwt.verify(token, JWT_SECRET);
        console.log(token);
        ctx.state.user = user;
        ctx.body = "修改成功";
    } catch (error) {
        console.error(error);
        return ctx.app.emit("error", tokenError, ctx);
    }
    await next();
};

module.exports = {
    auth,
};
