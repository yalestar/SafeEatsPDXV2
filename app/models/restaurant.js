var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
  name: String,
  site_id: String,
  time: {type: Date, default: Date.now}
});
// Restaurant has Address
// Restaurant has Location
// Restaurant has many Inspections
// Inspection has many Violations

Restaurant.statics.find_nearest = function(callback) {
    this.find({city: 'Canby'}, callback).limit(5);
};

module.exports = mongoose.model('Restaurant', Restaurant);
