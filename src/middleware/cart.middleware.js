const {goodsIdError} = require("@/constant/err.type");

const validator = async function (ctx, next) {
    try {
        ctx.verifyParams({
            goods_id: "number",
        });
        await next();
    } catch (error) {
        console.error(error);
        goodsIdError.result = error;
        return ctx.app.emit("error", goodsIdError, ctx);
    }
};

module.exports = {
    validator,
};
