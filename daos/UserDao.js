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