const {
    createAddr,
    findAllAddr,
    updateAddr,
    removeAddrService,
} = require("@/service/addr.service");

class AddAddress {
    async addAddress(ctx) {
        const {consignee, phone, address} = ctx.request.body;
        const user_id = ctx.state.user.id;
        const res = await createAddr({consignee, phone, address, user_id});
        ctx.body = {
            code: 0,
            message: "添加地址成功",
            result: res,
        };
    }

    async getAddress(ctx) {
        const user_id = ctx.state.user.id;
        const res = await findAllAddr(user_id);
        ctx.body = {
            code: 0,
            message: "获取列表成功",
            result: res,
        };
    }

    async updateAddress(ctx) {
        const addr_id = ctx.request.params.id;
        const res = await updateAddr(addr_id, ctx.request.body);
        ctx.body = {
            code: 0,
            message: "修改地址成功",
            result: res,
        };
    }
    async removeAddr(ctx) {
        const addr_id = ctx.request.params.id;
        const res = await removeAddrService(addr_id);
        ctx.body = {
            code: 0,
            message: "删除地址成功",
            result: res,
        };
    }
}

module.exports = new AddAddress();
