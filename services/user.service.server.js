module.exports = function (app){
    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/:username/username', findUserByUsername);
    app.get('/api/user/:username/username/:password/password', findUserByCredentials);

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.params['username'];
        var password = req.params['password'];

        userModel.findUserByCredentials({
            username: username,
            password: password
        }).then(function (user) {
            if(user === null) {
                res.send(404);
            }
            req.session['currentUser'] = user;
            res.send(user);
        })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        userModel.findUserByCredentials({username: username})
            .then(function (user) {
                if(user === null ){
                    res.send(404);
                }
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function profile(req, res){
        res.send(req.session['currentUser'])
    }
}
