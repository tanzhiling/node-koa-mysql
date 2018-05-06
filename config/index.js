'use strict'
const config = {
    username: 'root',
    password: '123456',
    database: 'app',
    host: "localhost",
    dialect: 'mysql',
    define: {
        underscored: false,
        timestamps: true,
        paranoid: true
    }
}
module.exports = config