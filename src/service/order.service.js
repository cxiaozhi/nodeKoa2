const Order = require("@/model/order.model");
class OrderService {
    async createOrderService(order) {
        console.log(order);
        try {
            const res = await Order.create(order);
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
            return "添加失败";
        }
    }
}

module.exports = new OrderService();
