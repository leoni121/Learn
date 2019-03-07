const router = require('koa-router')();
const userController = require('../controller/userController');
const resMsg = require('../common/resMsg');

router.prefix('/users')

router.get('/', function (ctx, next) {
  userController(ctx);
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/getUserInfo', userController.getUserInfoById)


router.get('/checkCors', function (ctx, next) {
    if (ctx.user) {
        ctx.body = {
            checkTokenGet: true,
            data: {
                user: ctx.user,
                methods: ctx.method
            }
        }
    } else {
        ctx.body = resMsg({
            status: false,
            msg: '验证失败'
        })
    }
})

router.post('/checkCors', function (ctx, next) {
    if (ctx.user) {
        ctx.body = {
            checkTokenGet: true,
            data: {
                user: ctx.user,
                methods: ctx.method
            }
        }
    } else {
        ctx.body = resMsg({
            status: false,
            msg: '验证失败'
        })
    }
})

router.put('/checkCors', function (ctx, next) {
    if (ctx.user) {
        ctx.body = {
            checkTokenGet: true,
            data: {
                user: ctx.user,
                methods: ctx.method
            }
        }
    } else {
        ctx.body = resMsg({
            status: false,
            msg: '验证失败'
        })
    }
})

router.delete('/checkCors', function (ctx, next) {
    if (ctx.user) {
        ctx.body = {
            checkTokenGet: true,
            data: {
                user: ctx.user,
                methods: ctx.method
            }
        }
    } else {
        ctx.body = resMsg({
            status: false,
            msg: '验证失败'
        })
    }
})



module.exports = router
