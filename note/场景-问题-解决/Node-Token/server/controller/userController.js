const UUID = require('../common/uuid');
const userModel = require("../model/userModel");
const { tipMsg, dataMsg } = require('../common/resMsg');
const bcrypt = require('../common/bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.config');
const util = require('util');


exports.login = async ctx => {
    let username = ctx.request.body.username
        ,password = ctx.request.body.password
        ,userInfo = await userModel.getUserByName(username)
        ,dbPasswordHash = userInfo && userInfo.password;

    if (!!dbPasswordHash && bcrypt.compare(password, dbPasswordHash)) {
        // 签发token
        const userToken = {
            name: userInfo.username,
            id: userInfo.id
        }
        const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})

        ctx.body = dataMsg({
            msg: '登录成功',
            data: {
                token
            }
        });
    } else {
        ctx.body = tipMsg({
            status: false,
            msg: '登录失败',
        });
    }
}

exports.register = async ctx => {
    let username = ctx.request.body.username
        ,dbPasswordHash = bcrypt.encrypt(ctx.request.body.password)
        ,id = UUID()
        ,exist = await userModel.getUserByName(username)
    if (!exist) {
        if (await userModel.saveUserInfo({
            id,
            email: '1948389397@qq.com',
            info: 'nzq',
            password: dbPasswordHash,
            phone: '18380168827',
            qq: '1948389397',
            username,
        })) {
            ctx.body = tipMsg({
                msg: '注册成功'
            });
        } else {
            ctx.body = tipMsg({
                msg: '服务器故障，请重新注册'
            })
        }
    } else {
        ctx.body = tipMsg({
            status: false,
            msg: '当前账号已注册'
        })
    }
}

exports.getUserInfoById = async ctx => {
    ctx.body = await userModel.getUserByName("hyh");
}


