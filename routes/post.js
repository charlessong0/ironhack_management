var Post = require('../models/Post');

exports.doPost = function(req, res) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', 'post success!');
        res.redirect('/u/' + currentUser.name);
    });
};
