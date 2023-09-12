const Goods = require("@/model/goods.model");

class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods);
        return res.dataValues ? res.dataValues : false;
    }

    async updateGoodsService(id, goods) {
        const res = await Goods.update(goods, {where: {id}});
        return res[0] > 0 ? true : false;
    }

    async removeGoodsService(id) {
        const res = await Goods.destroy({where: {id}});
        return res > 0 ? true : false;
    }

    async offGoodsService(id) {
        const res = await Goods.destroy({where: {id}});
        return res > 0 ? true : false;
    }

    async onGoodsService(id) {
        const res = await Goods.restore({where: {id}});
        return res > 0 ? true : false;
    }
}

module.exports = new GoodsService();
