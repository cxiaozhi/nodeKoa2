const {
    createAddr,
    findAllAddr,
    updateAddr,
    removeAddrService,
    setAddrService,
} = require("@/service/addr.service");
const {setAddrError} = require("@/constant/err.type");

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

    async setDefaultAddr(ctx) {
        const addr_id = ctx.request.params.id;
        const user_id = ctx.state.user.id;
        const res = await setAddrService(addr_id, user_id);
        if (res) {
            ctx.body = {
                code: 0,
                message: "设置默认地址成功",
                result: res,
            };
        } else {
            ctx.app.emit("error", setAddrError, ctx);
        }
    }
}

module.exports = new AddAddress();
