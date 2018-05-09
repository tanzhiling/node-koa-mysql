'use strict'
module.exports = function (sequelize, DataTypes) {
    var List = sequelize.define('list', {
        nickname: {
            type: DataTypes.STRING
        },
        station_train_code: {
            type: DataTypes.STRING
        },
        from_city: {
            type: DataTypes.STRING
        },
        to_city: {
            type: DataTypes.STRING
        },
        seat: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        order_num: {
            type: DataTypes.STRING
        },
        create_time: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
    });

    return List;
};