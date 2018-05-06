const db = require('../sql')
const List = db.List

module.exports = {
    'POST /api/list': async (ctx, next) => {
        let user_id = ctx.request.body.user_id
        let list = getList(user_id)
        ctx.response.status = 200
        ctx.response.body = {
            code: 0,
            data: list,
            msg: 'success'
        };
    }
};

function getList(user_id) {
    let list
    List.findAll({
        wherr: {
            user_id: user_id
        }
    }).then(res => {
        list = res
    }).catch(err => {
        console.log(err)
    })
    return list
}