const server = require('./server');
const router = require('./route').route;

server.start(router);
