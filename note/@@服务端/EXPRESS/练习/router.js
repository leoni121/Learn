/**
 * @Author nzq
 * @Date 2019/4/5
 * @Description:
 * @Param:
 * @Return:
 */
const express = require('express');
const router = express.Router();

router.use('/try', (req, res, next) =>{
  console.time("总共用时：");
  console.log("nzq/try")
  next();
})
// define the home page route
router.get('/try', function (req, res) {
  console.timeEnd("总共用时：");
  res.send(req.responseText + "nzq");
})
// define the about route
router.get('/try/about', function (req, res) {
  console.timeEnd("总共用时：");
  let responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

module.exports = router
