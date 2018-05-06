const fs = require('fs')
// 判断url请求
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4)
            router.get(path, mapping[url])
        } else if (url.startsWith('POST')) {
            var path = url.substring(5)
            router.post(path, mapping[url])
        } else if (url.startsWith('PUT')) {
            var path = url.substring(4)
            router.put(path, mapping[url])
        } else if (url.startsWith('DELETE')) {
            var path = url.substring(7)
            router.del(path, mapping[url])
        } else {
            console.log(`invaid URL: ${url}`)
        }
    }
}
// 加载文件
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        let mapping = require(__dirname + '/' + dir + '/' + f)
        addMapping(router, mapping)
    })
}
// 导出模块
module.exports = function (dir) {
    let controllers_dir = dir || `routes`,
        router = require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}