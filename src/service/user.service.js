const UserModel = require("@/model/user.model");
class UserService {
    async createUser(user_name, password) {
        // TODO: 写入数据库
        const res = await UserModel.create({user_name, password});
        return res.dataValues;
    }

    // 查询数据库
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {};
        id && Object.assign(whereOpt, {id});
        user_name && Object.assign(whereOpt, {user_name});
        password && Object.assign(whereOpt, {password});
        is_admin && Object.assign(whereOpt, {is_admin});
        const res = await UserModel.findOne({
            attributes: ["id", "user_name", "password", "is_admin"],
            where: whereOpt,
        });

        return res ? res.dataValues : null;
    }
}

module.exports = new UserService();
