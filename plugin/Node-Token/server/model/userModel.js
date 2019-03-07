const Mysql = require('../common/mysql')
const User = Mysql.import('../schema/user')

exports.getUserByName =  async (name) => {
    return await User.findOne({
        where: {
            username: name
        }
    })
}

exports.getUserById = async (id) => {
    return await User.findOne({
        where: {
            id: id
        }
    })
}

exports.saveUserInfo = async userInfo => {
    await  User.create(userInfo);
    return true
}


