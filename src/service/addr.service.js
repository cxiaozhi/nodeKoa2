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
}

module.exports = new AddrService();
