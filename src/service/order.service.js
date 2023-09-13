const Order = require("@/model/order.model");
class OrderService {
    async createOrderService(order) {
        try {
            const res = await Order.create(order);
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
            return "添加失败";
        }
    }

    async findAllOrderService(params) {
        try {
            const {count, rows} = await Order.findAndCountAll({
                attributes: ["goods_info", "total", "order_number", "state"],
                where: {
                    state: +params.status,
                },
                offset: (params.pageNum - 1) * params.pageSize,
                limit: +params.pageSize,
            });
            return {
                pageNum: params.pageNum,
                pageSize: params.pageSize,
                total: count,
                list: rows,
            };
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new OrderService();
