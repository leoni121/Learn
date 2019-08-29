const jwt = require('jsonwebtoken');
const secret = require('../config/secret.config');
const util = require('util');
const verify = util.promisify(jwt.verify);
const resMsg = require('../common/resMsg');

module.exports = function () {
    return async (ctx, next) => {
        try {
            // 客户端传入的是大写的
            const token = ctx.headers.authorization;
            if (token) {
                let payload
                try {
                    payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
                    ctx.user = {
                        name: payload.name,
                        id: payload.id
                    }
                } catch (err) {
                    console.log('token verify fail: ', err)
                }
            }
            console.log(`token: ${token}`);

            await next();
            // 捕获 其他地方的错误
        } catch ( error ) {
            if (error.status === 401) {
                ctx.body = resMsg.tipMsg({
                    status: false,
                    msg: '认证失败'
                })
            } else {
                ctx.body = resMsg.tipMsg({
                    msg: '服务器发生错误',
                    status: false,
                })
            }
        }
    }
}


