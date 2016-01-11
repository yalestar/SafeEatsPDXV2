var Restaurant = require('../models/restaurant');

exports.findNearest = function(request, reply) {
  Restaurant.find_nearest(function(err, restaurants) {
    if (err) { throw new err; }

    var json = restaurants;
    reply(json);
  });
};
