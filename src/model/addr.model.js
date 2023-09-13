const seq = require("@/db/seq");
const {DataTypes} = require("sequelize");

const Addr = seq.define("zd_address", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户ID",
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货人",
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: "联系方式",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货地址",
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否是默认地址 0:不是 1:是",
    },
});

// Addr.sync({force: true});
module.exports = Addr;
