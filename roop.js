var mongoose = require('mongoose');
var geoTools = require('geo-tools');
var db = require('./app/config/db');
var Restaurant = require('./app/models/restaurant');
var Geocodio = require('geocodio');
var config = {
  api_key: '96e761e791175ae858633ee558abb36717aa793'
}
var geocodio = new Geocodio(config);
var rest = Restaurant.findOne({city: 'Canby'}, function(err, rest) {
      if (err) throw err;
      var address = rest.gc.address.clackamas;
      console.log(geocodio);
      geocodio.get('geocode', {q: address}, function(err, response){
        if (err) throw err;
        console.log(response);
      });
});

// Restaurant.find({city: 'Canby'}, function (err, rests) {
//   // if (err) return console.error(err);
//   rests.forEach(function(rest) {
//     // console.log(rest.gc.address.clackamas);

//     geocode(rest.gc.address.clackamas, function(coordinates){
//       console.log(coordinates)
//     })

//     // console.log(rest);
//     // console.log(rest.street);
//     // console.log(rest.state);
//     // console.log(rest.zip);
//     // console.log(rest.county);
//     // console.log(rest.city);
//   })
// }).limit(5);

