const db = require('../sql')
const List = db.List
const User = db.User

function ran() {
    let res = []
    for (var i = 0; i < 4; i++) {
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
        res.push(String.fromCharCode(65 + ranNum));
    }
    return res.join("")
}
module.exports = {
    // 添加
    'POST /api/list/set_info': async (ctx, next) => {
        const {
            nickname,
            station_train_code: station_train_code,
            from_city,
            to_city,
            seat,
            price
        } = ctx.request.body
        let data = await List.create({
            nickname: nickname,
            station_train_code: station_train_code,
            from_city: from_city,
            to_city: to_city,
            seat: seat,
            price: price,
            create_time: new Date().getTime(),
            order_num: ran() + new Date().getTime()
        })
        if (data) {
            User.decrement({
                balance: price
            }, {
                where: {
                    nickname: nickname //查询条件
                }
            })
            ctx.response.body = {
                code: 0,
                msg: '购买成功！'
            };
        } else {
            ctx.response.body = {
                code: -1,
                msg: '购买失败！'
            };
        }
    },
    // 查询 
    'POST /api/list/get_info': async (ctx, next) => {
        const {
            nickname
        } = ctx.request.body
        if (nickname) {
            let data = await List.findAll({
                where: {
                    nickname: nickname
                }
            })
            if (data) {
                ctx.response.body = {
                    code: 0,
                    data: data,
                    msg: '查询成功！'
                };
            } else {
                ctx.response.body = {
                    code: -1,
                    msg: '该用户订单为空！'
                };
            }
        } else {
            ctx.response.body = {
                code: -1,
                msg: '用户昵称不为空'
            };
        }
    },
    // 删除
    'POST /api/list/delete_info': async (ctx, next) => {
        const {
            id
        } = ctx.request.body
        if (id) {
            let data = await List.destroy({
                where: {
                    id: id
                }
            })
            if (data) {
                ctx.response.body = {
                    code: 0,
                    msg: '删除成功！'
                };
            } else {
                ctx.response.body = {
                    code: -1,
                    msg: '该订单不存在！'
                };
            }
        } else {
            ctx.response.body = {
                code: -1,
                msg: '用户id不为空'
            };
        }
    }
};