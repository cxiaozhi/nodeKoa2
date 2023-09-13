const {
    createOrderService,
    findAllOrderService,
    patchOrderService,
} = require("@/service/order.service");
const {addOrderError, getOrderError} = require("@/constant/err.type");

class OrderController {
    async createOrder(ctx) {
        const user_id = ctx.state.user.id;
        const {address_id, goods_info, total} = ctx.request.body;
        const order_number = "ZD" + Date.now();
        const data = await createOrderService({
            user_id,
            address_id,
            goods_info,
            total,
            order_number,
        });
        ctx.body = {
            code: 0,
            message: "创建订单成功",
            result: data,
        };
    }

    async getOrderList(ctx) {
        const {pageNum = 1, pageSize = 10, status = 0} = ctx.request.query;
        const res = await findAllOrderService({pageNum, pageSize, status});
        if (res) {
            ctx.body = {
                code: 0,
                message: "获取订单成功",
                result: res,
            };
        } else {
            ctx.app.emit("error", getOrderError, ctx);
        }
    }

    async updateOrder(ctx) {
        const id = ctx.request.params.id;
        const {state} = ctx.request.body;
        const res = await patchOrderService(id, state);
        ctx.body = {
            code: 0,
            message: "更新订单状态成功",
            result: res,
        };
    }
}

module.exports = new OrderController();
