var mongodb = require('../db');
var Post = require('../models/Post');

exports.save = function save(post, callback) {
  // save into mongodb documents

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // read 'posts' set from the database
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // create index for 'user'
      collection.ensureIndex('user');
      // write into 'post' document
      collection.insert(post, {safe: true}, function(err, post) {
        mongodb.close();
        callback(err, post);
      });
    });
  });
};

exports.get = function get(username, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // read posts set
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // find user based on username, null will return all the users
      var query = {};
      if (username) {
        query.user = username;
      }
      collection.find(query).sort({time: -1}).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          callback(err, null);
        }
        // create post object for each posts
        var posts = [];
        docs.forEach(function(doc, index) {
          var post = new Post({
            user: doc.user, 
            post: doc.post, 
            time: doc.time,
        });
        var post1 = new Post(doc);
          posts.push(post1);
        });
        callback(null, posts);
      });
    });
  });
};
