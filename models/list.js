'use strict'
module.exports = function (sequelize, DataTypes) {
    var List = sequelize.define('list', {
        user_id: {
            type: DataTypes.INTEGER
        },
        from_city: {
            type: DataTypes.STRING
        },
        to_city: {
            type: DataTypes.STRING
        },
        order_id: {
            type: DataTypes.STRING
        },
        order_num: {
            type: DataTypes.STRING
        },
        create_time: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
    });

    return List;
};
