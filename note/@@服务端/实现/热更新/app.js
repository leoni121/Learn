/**
 * @Author nzq
 * @Date 2019/4/4
 * @Description:
 * @Param:
 * @Return:
 */
var express = require('express');
var app = express();
var router = require('./router.js');

app.use(router);

app.listen(3000);
