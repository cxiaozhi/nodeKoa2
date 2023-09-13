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
}

module.exports = new AddrService();
