const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const sql = require('./sql')
const router = require('./router')
const template = require('./template');
const app = new Koa()
app.use(cors())
const isProduction = process.env.NODE_ENV === 'production';
sql.sequelize.sync({
    force: false
}).then(res => {
    console.log("serve success");
}).catch(err => {
    console.log("Server failed to start due to error: %s", err);
});
app.use(async (ctx, next) => {
    let
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
app.use(bodyParser())
app.use(template('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(router())
app.listen(3000)