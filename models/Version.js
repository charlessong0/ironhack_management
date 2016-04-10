function Version(version) {
    this.ironhackName = version.ironhackName;
    this.currentPhase = version.currentPhase;
    if (version.time) {
        this.time = version.time;
    } else {
        this.time = new Date();
    }
}

module.exports.Version;

var VersionDao = require('../daos/VersionDao');

Version.get = function get(callback) {
    VersionDao.get(callback);
}
