const db = require('../db/users');
const register_db = require('../db/registerUser');
const _ = require('lodash');

module.exports.getUsers = () => {
    return db;
};

module.exports.register = () => {
    return register_db;
};