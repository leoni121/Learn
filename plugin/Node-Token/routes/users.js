const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/tryCors', function (req, res, next) {
  res.send({
    status: 200
  })
})

router.post('/login', function (req, res, next) {

})

module.exports = router;
