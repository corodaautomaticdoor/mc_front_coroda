module.exports = (server) => {
    require('./auth/router')(server);
    require('./producto/router')(server);
}