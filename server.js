'use strict';

const Hapi = require('hapi');
const Pages = require('./handlers/pages');
// const Assets = require('./handlers/assets');
// const Actions = require('./handlers/actions');

const server = new Hapi.Server();
server.connection({port: 3000});

// const handler = function (request, reply) {
//   reply.view('index', {
//     title: ' ' + request.server.version,
//     message: 'ssafe eeats'
//   });
// };

server.register(require('vision'), (err) => {
    if (err) {
        throw err;
    }
    server.views({
        engines: {html: require('handlebars')},
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layout',
        layout: true
        // isCached: false,
        // helpersPath: './views/helpers',
        // partialsPath: './views/partials'

    });
    // server.route({ method: 'GET', path: '/', handler: handler });
});
server.route(require('./routes'));

server.start(() => {
    console.log('Server running at:', server.info.uri);
});