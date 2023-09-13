const Addr = require("@/model/addr.model");

class AddrService {
    async createAddr(params) {
        try {
            const res = await Addr.create(params);
            return res;
        } catch (error) {
            console.error(error);
            return "添加失败";
        }
    }

    async findAllAddr(user_id) {
        return await Addr.findAll({
            where: {user_id},
            attributes: ["id", "consignee", "phone", "address", "is_default"],
        });
    }

    async updateAddr(id, addrObj) {
        return await Addr.update(addrObj, {where: {id}});
    }

    async removeAddrService(id) {
        return await Addr.destroy({where: {id}});
    }

    async setAddrService(id, user_id) {
        await Addr.update({is_default: false}, {where: {user_id}});
        const res = await Addr.update({is_default: true}, {where: {id}});
        return res[0] > 0 ? true : false;
    }
}

module.exports = new AddrService();
