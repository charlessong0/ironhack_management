var crypto = require('crypto');
var User = require('../models/User');
var Post = require('../models/Post');

var user = require('./user');
var post = require('./post');

var that = exports;

exports.index = function(req, res) {
    Post.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: 'Homepage',
            posts: posts
        });
    });
};

exports.login = function(req, res) {
    res.render('login', {
        title: 'User Login',
    });
};

exports.doLogin = function(req, res) {
    //md5 for password
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if (!user) {
            req.flash('error', 'user does not exist');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', 'wrong password');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', 'login success!');
        res.redirect('/');
    });
};


exports.logout = function(req, res) {
    req.session.user = null;
    req.flash('success', 'logout success!');
    res.redirect('/');
};


module.exports = function(app) {

    app.get('/', that.index);

    app.get('/login', checkNotLogin);
    app.get('/login', that.login);


    app.post('/login', checkNotLogin);
    app.post('/login', that.doLogin);


    app.get('/logout', checkLogin);
    app.get('/logout', that.logout);


    app.get('/u/:user', user.view);

    app.get('/reg', checkNotLogin);
    app.get('/reg', user.reg);

    app.post('/reg', checkNotLogin);
    app.post('/reg', user.doReg);



    app.post('/post', checkLogin);
    app.post('/post', post.doPost);

};

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'shoudl login first');
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'login already');
        return res.redirect('/');
    }
    next();
}
