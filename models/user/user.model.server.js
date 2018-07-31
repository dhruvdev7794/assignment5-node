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
function updateProfile(user){
    return userModel.update(user, {
        $set: {password: user.password}
    });
}
function deleteProfile(username){
    return userModel.remove({
        username: username
    });
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile
}

// var user = {
//     username: 'Alica',
//     password: 'alice'
// };
//
// createUser(user);

module.exports = api;