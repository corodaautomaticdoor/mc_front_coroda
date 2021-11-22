const controller = require('./controller');
const proxy = require('../proxy');

module.exports = (server) => {
    server.post('/producto', (req,res) => {
        return proxy.request(req, res, '/producto',function(){
            console.log(req)
            return controller.getProductos();
        });
    });
}