var mongodb = require('../db');
var Version = require('../models/Version');

exports.get = function get(callback) {
    mongodb.open(function(err, db) {
        if(err) {
            //mongodb.close();
            return callback(err);
        }
console.log("11111111111")
        db.collection('versions', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err, null);
            }

            colelction.findOne(function(err, doc) {
                mongodb.close();
                if (err) {
                    callback(err);
                }
                if (doc) {
                    //var version = new Version(doc);
                    //console.log(version);
                    callback(err, doc);
                }
                else {
                    callback(err);
                }
            });
        });
    });
};

