const {
    createOrUpdate,
    findCarts,
    updateCartService,
    removeCartService,
} = require("@/service/cart.service");

const {
    getCartListError,
    cartFormatError,
    deleteCartError,
} = require("@/constant/err.type");
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

    async updateCart(ctx) {
        const id = ctx.request.params.id;
        const {number, selected} = ctx.request.body;
        if (number === undefined && selected === undefined) {
            cartFormatError.message = "number and selected 不能同时为空";
            return ctx.app.emit("error", cartFormatError, ctx);
        }
        try {
            const res = await updateCartService({id, number, selected});
            ctx.body = {
                code: 0,
                message: "更新购物车成功",
                result: res,
            };
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", cartFormatError, ctx);
        }
    }

    async removeCart(ctx) {
        const {ids} = ctx.request.body;
        const res = await removeCartService(ids);
        console.log(res);
        if (res) {
            ctx.body = {
                code: 0,
                message: "删除购物车成功",
                result: res,
            };
        } else {
            return ctx.app.emit("error", deleteCartError, ctx);
        }
    }
}

module.exports = new CartController();
