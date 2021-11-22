const controller = require('./controller');
const proxy = require('../proxy');

module.exports = (server) => {
    server.post('/auth/login', (req,res) => {
        return proxy.request(req, res, '/auth/login',function(){
            return controller.getUsers();
        });
    });
    server.post('/auth/register', (req,res) => {
        return proxy.request(req, res, '/auth/register',function(){
            return controller.register();
        });
    });
}