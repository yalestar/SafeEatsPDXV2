var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
  name: String,
  site_id: String,
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurant', Restaurant);
