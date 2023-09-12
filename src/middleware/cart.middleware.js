const {cartFormatError} = require("@/constant/err.type");

// 闭包 应用场景 内部函数只接收两个参数 但需要引用三个参数  通过闭包 在外部函数调用再传递一个参数
const validator = function (rules) {
    return async function (ctx, next) {
        try {
            ctx.verifyParams(rules);
            await next();
        } catch (error) {
            console.error(error);
            cartFormatError.result = error;
            return ctx.app.emit("error", cartFormatError, ctx);
        }
    };
};

module.exports = {
    validator,
};
