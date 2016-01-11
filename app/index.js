'use strict';

var Hapi = require('hapi');
var Pages = require('./handlers/pages');
var db = require('./config/db');
// var Assets = require('./handlers/assets');
// var Actions = require('./handlers/actions');

console.log("=================================================================");
var server = new Hapi.Server();
server.connection({port: 9000});

server.register(require('vision'), function (err) {
  if (err) {
      throw err;
  }
  server.views({
      engines: { html: require('handlebars') },
      relativeTo: __dirname,
      path: './views',
      layoutPath: './views/layout',
      layout: true,
      isCached: false,
      helpersPath: './views/helpers',
      partialsPath: './views/partials'
  });
});
server.route(require('./routes'));

server.register(require('inert'), function(err) {
  if (err) { throw err; }
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });
});
server.start(function() {
    console.log('Server running at:', server.info.uri);
});
