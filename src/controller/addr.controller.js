const {createAddr} = require("@/service/addr.service");

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
}

module.exports = new AddAddress();
