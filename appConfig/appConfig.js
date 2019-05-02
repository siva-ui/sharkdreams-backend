const appConfig = {}

appConfig.db = {
    url: 'mongodb://127.0.0.1:27017/sharkdreamsDB'

}
appConfig.port = 3000;
appConfig.allowedCorsOrigin = '*',
appConfig.version = 'ver_1'

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    db:appConfig.db,
    version:appConfig.version
}