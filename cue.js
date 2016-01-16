var async = require('async');
var request = require('request');

var maxJobs = 2;
function worker(task, callback) {
  request.post({
      uri: 'http://localhost:8080',
      body: JSON.stringify(task)
    },
    function(err, res, body) {
      callback(err, body && JSON.parse(body));
    }
  );
}

var queue = async.queue(worker, maxJobs);

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11].forEach(function(i) {
  // [1].forEach(function(i) {
  queue.push(i, cb);
    function cb(err, result) {
      if (err) throw err;
      console.log(i + ' ^^2 = %d', result);
    }
});
