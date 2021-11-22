const db = require('../db/productos');
const _ = require('lodash');

module.exports.getProductos = () => {
    return db;
};