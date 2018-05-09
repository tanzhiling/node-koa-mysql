'use strict'
const config = require('../config')
const Sequelize = require('sequelize')
const db = {
    sequelize:new Sequelize(config.database, config.username , config.password , config),
}
db.User = db.sequelize.import('../models/user.js')
db.List = db.sequelize.import('../models/list.js')
db.Train = db.sequelize.import('../models/train.js')
db.sequelize.authenticate().then(function() {
    console.log("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
});
module.exports = db