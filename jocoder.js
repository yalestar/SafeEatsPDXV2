var Geocodio = require('geocodio');

var config = {
  api_key: '96e761e791175ae858633ee558abb36717aa793'
}
var maxWorkers = 2;

var geocodio = new Geocodio(config);
// var address = 'One Embarcadero Center, 9th Floor, San Francisco, CA 94111';
var address = '694 NE 4th Ave., Canby, OR 97013';

geocodio.get('geocode', {q: address}, function(err, response){
    if (err) throw err;
    obj = JSON.parse(response)
    console.log(obj.results[0].location);
});
