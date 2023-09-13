const Cart = require("@/model/cart.model");
const Goods = require("@/model/goods.model");
const {Op} = require("sequelize");

class CartService {
    async createOrUpdate(user_id, goods_id) {
        console.log(user_id, goods_id);
        // 根据两个id 同时查找数据
        const res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id,
                },
            },
        });

        if (res) {
            // 更新数据
            await res.increment("number");
            return await res.reload();
        } else {
            // 增加数据
            return await Cart.create({
                user_id,
                goods_id,
            });
        }
    }
    async findCarts(pageNum, pageSize) {
        const {count, rows} = await Cart.findAndCountAll({
            attributes: ["id", "number", "selected"],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ["id", "goods_name", "goods_price", "goods_img"],
            },
        });

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        };
    }

    async updateCartService(params) {
        const {id, number, selected} = params;
        const res = await Cart.findByPk(id);
        if (!res) return "";
        number !== undefined ? (res.number = number) : "";
        if (selected !== undefined) {
            res.selected = selected;
        }
        return await res.save();
    }

    async removeCartService(ids) {
        const res = await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });

        if (res) {
            return res;
        } else {
            return false;
        }
    }

    async selectAllCarts(user_id) {
        return await Cart.update(
            {selected: true},
            {
                where: {
                    user_id,
                },
            }
        );
    }

    async unSelectAllCarts(user_id) {
        return await Cart.update(
            {selected: false},
            {
                where: {
                    user_id,
                },
            }
        );
    }
}

module.exports = new CartService();
