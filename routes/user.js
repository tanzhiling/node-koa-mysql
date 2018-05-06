const db = require('../sql')
const User = db.User
let list
User.findAll().then(res => {
    list = JSON.stringify(res)
}).catch(err => {
    console.log(err)
})
module.exports = {
    'GET /api/user': async (ctx, next) => {
        ctx.response.status = 200
        ctx.response.body = {
            code:0,
            data:JSON.parse(list),
            msg:'success'
        };
    }
};