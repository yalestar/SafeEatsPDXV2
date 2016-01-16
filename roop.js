var mongoose = require('mongoose');
var geoTools = require('geo-tools');
var db = require('./app/config/db');
var Restaurant = require('./app/models/restaurant');
var Geocodio = require('geocodio');
var config = {
    api_key: '96e761e791175ae858633ee558abb36717aa793'
}
var geocodio = new Geocodio(config);
// var rest = Restaurant.findOne({city: 'Canby'}, function(err, rest) {
//   if (err) throw err;
//   var address = rest.gc.address.clackamas;
//   console.log(rest.name);
//   var coords = geocodeRestaurant(address);
//   rest.loc = coords;
//   rest.save();
// });

function geocodeRestaurant(address) {
    var location = [];
    geocodio.get('geocode', {q: address}, function(err, response) {
    if (err) { throw err; }
      obj = JSON.parse(response);
      return location = obj.results[0].location;
    });
}
Restaurant.find({city: 'Canby'}, function(err, rests) {
  rests.forEach(function(rest) {
    var address = rest.gc.address.clackamas;
    var coords = geocodeRestaurant(address);
    rest.loc = coords;
    console.log(rest.name + ": " + coords);
    rest.save();
  });
}).limit(2);

