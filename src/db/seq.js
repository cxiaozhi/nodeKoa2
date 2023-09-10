const {Sequelize} = require("sequelize");

const seq = new Sequelize("zdsc", "root", "ccz123456", {
    host: "localhost",
    dialect: "mysql",
});
// seq.authenticate()
//     .then(() => {
//         console.log("连接成功");
//     })
//     .catch((err) => {
//         console.log("连接失败", err);
//     });
module.exports = seq;
