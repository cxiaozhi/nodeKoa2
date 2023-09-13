const {addOrderError} = require("@/constant/err.type");

const validator = (rules) => {
    return async function (ctx, next) {
        try {
            ctx.verifyParams(rules);
            await next();
        } catch (error) {
            console.error(error);
            addOrderError.result = error;
            return ctx.app.emit("error", addOrderError, ctx);
        }
    };
};

module.exports = {
    validator,
};
