require('dotenv').config();

module.exports = {
  development: {
    username: 'admin',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'test',
    host: 'database-1.cczjxovu7nad.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodebird_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: 'admin',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodebird',
    host: 'database-1.cczjxovu7nad.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false,
  },
};