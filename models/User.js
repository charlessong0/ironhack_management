function User(user) {
    this.name = user.name; //this is username!
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;

    this.realName = user.realName;
    this.githubName = user.githubName;
    this.phoneNumber = user.phoneNumber;
    this.scores = user.scores;

    if (user.time) {
        this.time = user.time;
    } else {
        this.time = new Date();
    }
};
module.exports = User;



var UserDao = require('../daos/UserDao');

User.prototype.save = function save(callback) {
    // save into mongodb
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        type: this.type,

        realName: this.realName,
        githubName: this.githubName,
        phoneNumber: this.phoneNumber,
        time: this.time,
        scores: this.scores,
    };

    UserDao.save(user, callback);
};

User.get = function get(username, callback) {
    UserDao.get(username, callback);
};
