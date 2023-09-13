class AddAddress {
    async addAddress(ctx) {
        ctx.body = ctx.state.user.id;
    }
}

module.exports = new AddAddress();
