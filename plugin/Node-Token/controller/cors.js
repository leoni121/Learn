exports.cors1 = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Credentials','true'); 跨域携带cookies
  next();
}

exports.cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
}