const {createOrUpdate, findCarts} = require("@/service/cart.service");
const {getCartListError} = require("@/constant/err.type");
class CartController {
    async addCart(ctx) {
        const uesr_id = ctx.state.user.id;
        const goods_id = ctx.request.body.goods_id;
        const res = await createOrUpdate(+uesr_id, +goods_id);
        if (res) {
            ctx.body = {
                code: 0,
                message: "添加购物车成功",
                result: res,
            };
        } else {
        }
    }

    async getCart(ctx) {
        const {pageNum = 1, pageSize = 10} = ctx.request.query;
        const res = await findCarts(pageNum, pageSize);
        if (res) {
            ctx.body = {
                code: 0,
                message: "获取购物车列表成功",
                result: res,
            };
        } else {
            return ctx.app.emit("error", getCartListError, ctx);
        }
    }
}

module.exports = new CartController();
