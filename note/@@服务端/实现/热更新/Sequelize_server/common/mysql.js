const Sequelize = require('sequelize');
const MYSQL  = require('../config/mysql.config');

const mysql = new Sequelize(
    MYSQL.database,
    MYSQL.username,
    MYSQL.password,
    {
        host: MYSQL.host,
        dialect: MYSQL.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        // 应用全局的模型参数
        define: {
            timestamps: false, // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
            quoteIdentifiers: true
        }
    },
)

// 测试
/*mysql.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});*/

module.exports =  mysql
