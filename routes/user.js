const md5 = require('md5');
const db = require('../sql')
const User = db.User
module.exports = {
    // 登录
    'POST /api/user/login': async (ctx, next) => {
        const {
            nickname,
            password
        } = ctx.request.body
        if (nickname) {
            if (password) {
                let data = await User.findOne({
                    where: {
                        nickname: nickname,
                        password: md5(password)
                    }
                })
                if (data) {
                    ctx.response.body = {
                        code: 0,
                        data: data,
                        msg: '登录成功！'
                    };
                } else {
                    ctx.response.body = {
                        code: -1,
                        msg: '当前账号不存在！'
                    };
                }
            } else {
                ctx.response.body = {
                    code: -1,
                    msg: '密码不为空！'
                };
            }
        } else {
            ctx.response.body = {
                code: -1,
                msg: '账号不为空！'
            };
        }
    },
    // 查询
    'POST /api/user/get_info': async (ctx, next) => {
        const {
            id
        } = ctx.request.body
        if (id) {
            let data = await User.findOne({
                where: {
                    id: id
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
                    msg: '该用户不存在！'
                };
            }
        } else {
            ctx.response.body = {
                code: -1,
                msg: '用户id不为空'
            };
        }
    },
    // 添加用户信息
    'POST /api/user/set_info': async (ctx, next) => {
        const {
            nickname,
            password
        } = ctx.request.body
        if (nickname) {
            if (password) {
                let data = await User.findAll({
                    where: {
                        nickname: nickname
                    }
                })
                if (data.length == 0) {
                    User.create({
                        nickname: nickname,
                        password: md5(password),
                        create_time: new Date().getTime()
                    })
                    ctx.response.body = {
                        code: 0,
                        msg: '注册成功！'
                    };
                } else {
                    ctx.response.body = {
                        code: -1,
                        msg: '该昵称已被注册，请重新注册！'
                    };
                }
            } else {
                ctx.response.body = {
                    code: -1,
                    msg: '密码不为空！'
                };
            }
        } else {
            ctx.response.body = {
                code: -1,
                msg: '账号不为空！'
            };
        }
    },
    // 修改用户信息
    'POST /api/user/update_info': async (ctx, next) => {
        const {
            nickname,
            sex,
            brith,
            mobile,
            email,
            age,
            city,
            id_card,
            bank
        } = ctx.request.body
        let data = await User.update({
            sex: sex,
            brith: brith,
            mobile: mobile,
            email: email,
            age: age,
            city: city,
            id_card: id_card,
            bank: bank
        }, {
            where: {
                nickname: nickname //查询条件
            }
        })
        if (data) {
            let info = await User.findOne({
                where: {
                    nickname: nickname,
                }
            })
            ctx.response.body = {
                code: 0,
                data: info,
                msg: '修改成功！'
            };
        } else {
            ctx.response.body = {
                code: -1,
                msg: '修改失败'
            };
        }
    },
    // 删除用户信息
    'POST /api/user/delete_info': async (ctx, next) => {}
};