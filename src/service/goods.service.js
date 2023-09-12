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

    async findGoodsService(pageNum, pageSize) {
        // 获取总数
        const total = await Goods.count();
        const res = await Goods.findAll({
            offset: (pageNum - 1) * pageSize,
            limit: +pageSize,
        });
        // 获取分页数据
        return {pageNum, pageSize, total, goods_list: res};
    }
}

module.exports = new GoodsService();
