var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers(){
    return userModel.find();
}
function findUserByCredentials(credentials){
    return userModel.findOne(credentials);
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
}

// var user = {
//     username: 'Alica',
//     password: 'alice'
// };
//
// createUser(user);

module.exports = api;