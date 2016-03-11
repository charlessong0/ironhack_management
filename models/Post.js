function Post(post) {
    this.user = post.user;
    this.post = post.post;
    if (post.time) {
        this.time = post.time;
    } else {
        this.time = new Date();
    }

    this.type = post.type;
    this.judgingUsername = post.judgingUsername;
    this.phase = post.phase;  //phase in numbers, 1, 2, 3...
    this.overallComment = post.overallComment;
    this.judging = post.judging;
};
module.exports = Post;



var PostDao = require('../daos/PostDao');

Post.prototype.save = function save(callback) {
    // save into mongodb
    var post = {
        user: this.user,
        post: this.post,
        time: this.time,

        type: this.type,
        judgingUsername: this.judgingUsername,
        phase: this.phase,
        overallComment: this.overallComment,
        judging: this.judging,
    };
    PostDao.save(post, callback);
};

Post.get = function get(username, callback) {
    PostDao.get(username, callback);
};
