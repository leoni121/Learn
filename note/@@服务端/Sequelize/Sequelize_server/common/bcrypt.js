const bcrypt = require('bcrypt');
const saltRounds = 10;

// 同步
exports.encrypt = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}

exports.compare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}
