var Post = require('../models/Post');

exports.doPost = function(req, res) {
    var currentUser = req.session.user;
    var tempPost = {
        
    };
    var post = new Post({
        user: currentUser.name, 
        post: req.body.post,


        type: 1,
        judgingUsername: "test",
        phase: 1,

        judging:[{
            part: 1,
            title: "this is the title 1",
            description: "this is the desctiption 1",
            score: 100,
            questions: [
                {
                    index: 1,
                    title: "test1",
                    content: "content1",
                    description: 'desc',
                    scoreRange: [0, 10],
                    score1: 3,
                    score2: 5,
                },{
                    index: 2,
                    title: "test1",
                    content: "content1",
                    description: 'desc',
                    scoreRange: [0, 10],
                    score1: 3,
                    score2: 5,
                
                }
            ],

        },{
            part: 2,
            title: "this is the title 1",
            description: "this is the desctiption 1",
            score: 100,
            questions: [
                {
                    index: 1,
                    title: "test1",
                    content: "content1",
                    description: 'desc',
                    scoreRange: [0, 10],
                    score1: 3,
                    score2: 5,
                },{
                    index: 2,
                    title: "test1",
                    content: "content1",
                    description: 'desc',
                    scoreRange: [0, 10],
                    score1: 3,
                    score2: 5,
                
                }
            ],
        

        }
        
        ],
    });
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', 'post success!');
        res.redirect('/u/' + currentUser.name);
    });
};
