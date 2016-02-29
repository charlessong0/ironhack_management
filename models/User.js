function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;
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
    };

    UserDao.save(user, callback);
};

User.get = function get(username, callback) {
    UserDao.get(username, callback);
};
