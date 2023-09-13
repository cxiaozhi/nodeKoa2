const {createOrderService} = require("@/service/order.service");
const {addOrderError} = require("@/constant/err.type");

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
}

module.exports = new OrderController();
