var db = require('./app/config/db');
var Restaurant = require('./app/models/restaurant');
var Geocodio = require('geocodio');
var async = require('async');

var geocodio = new Geocodio({api_key: '96e761e791175ae858633ee558abb36717aa793'});

function geocodeRestaurant(address, callback) {
  geocodio.get('geocode', {q: address}, function(err, response) {
    if (err) { throw err; }
    var obj = JSON.parse(response);
    callback(err, obj);
  });
}
var queue = async.queue(geocodeRestaurant, 2);
queue.drain = function() {
  console.log('queue is drained')
  process.exit(0);
};
// Restaurant.find({loc: {$exists: true, $not: {$size: 0}}}, function(err, rests) {
Restaurant.find({city: {$ne: 'Canby'}}, function(err, rests) {
  rests.forEach(function(rest) {
    var address = rest.gc.address.clackamas;
    queue.push(address, cb);

    function cb(err, obj) {
      if (err) { throw err; }
      var coords = obj.results[0].location;
      rest.loc = coords;
      console.log('saving? ', rest.name, rest.city, coords);
      var did = rest.save();
      // console.log('DID: ', did);
    }
  });
});
