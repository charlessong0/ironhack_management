var crypto = require('crypto');
var User = require('../models/User');
var Post = require('../models/Post');

exports.view = function(req, res) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', 'no such user');
            return res.redirect('/');
        }
        Post.get(user.name, function(err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', {
                title: user.name,
                posts: posts,
            });
        });
    });
};



exports.reg = function(req, res) {
    res.render('reg', {
        title: 'User Register',
    });
};

exports.doReg = function(req, res) {
    //check if the two passwords are the same
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', 'two passwords do not match');
        return res.redirect('/reg');
    }

    //create md5 for password
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    //check if the username exists
    User.get(newUser.name, function(err, user) {
        if (user) err = 'Username already exists.';
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //if not, create new user
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', 'register sucess');
            res.redirect('/');
        });
    });
};
