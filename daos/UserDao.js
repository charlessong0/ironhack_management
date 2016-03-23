var mongodb = require('../db');
var User = require('../models/User');

exports.save = function save(user,callback) {
  // save into mongodb documents
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // get users set
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // add index for 'name'
      collection.ensureIndex('name', {unique: true});
      // write into the user document
      collection.insert(user, {safe: true}, function(err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
};

exports.get = function get(username, callback) {
    mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // get users set
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // check posts whose name=username 
      collection.findOne({name: username}, function(err, doc) {

//        var newScore = doc.scores;
//        newScore.push("haha123");
//        collection.update({name: username}, {$set:{scores: newScore}}, function(err, bar){});
        mongodb.close();
        if (doc) {
          // create User object based on user
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
};

//set the scores for a user
//the parameter "score" is an array with the scores of phase1, 2, 3, final
exports.setScore = function get(username, score, callback) {
    mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // get users set
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // check posts whose name=username 
      collection.findOne({name: username}, function(err, doc) {
        //var newScore = doc.scores;
        //newScore.push("haha123");
        collection.update({name: username}, {$set:{scores: score}}, function(err, bar){});
        mongodb.close();
        if (doc) {
          // create User object based on user
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
};

// get all the user
exports.getAll = function getAll(callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.find().toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          callback(err);
        }

        var users = [];
        docs.forEach(function (doc, index) {
          var user = new User(doc);
          users.push(user);
        });
        //console.log(users);
        callback(null, users);
      });
    });
  });
};
