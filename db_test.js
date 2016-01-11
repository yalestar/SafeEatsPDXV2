'use strict';
var mongoose = require('mongoose');

var config = {
  "db": "safe_eats",
  "host": "localhost",
  "user": "",
  "pw": "",
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uriString = process.env.MONGOHQ_URL ||  "mongodb://" + login + config.host + port + "/" + config.db;

console.log("===========================================================");
console.log(uriString);
console.log("===========================================================");

var mongoOptions = { db: { safe: true } };

mongoose.connect(uriString, mongoOptions, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log('connected to: ' + uriString);
  }
});
