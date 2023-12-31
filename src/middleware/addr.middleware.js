const {addrFormatError} = require("@/constant/err.type");

const validator = (rules) => {
    return async function (ctx, next) {
        try {
            await ctx.verifyParams(rules);
        } catch (error) {
            console.error(error);
            addrFormatError.result = error;
            return ctx.app.emit("error", addrFormatError, ctx);
        }
        await next();
    };
};

module.exports = {
    validator,
};
