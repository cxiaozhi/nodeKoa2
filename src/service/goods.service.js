const Goods = require("@/model/goods.model");

class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods);
        return res.dataValues ? res.dataValues : false;
    }
}

module.exports = new GoodsService();
