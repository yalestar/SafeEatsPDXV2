exports.home = function(request, reply) {
    reply.view('index', {
        title: ' ' + request.server.version,
        message: 'ssafe eeats'
    });
};

exports.api = function(request, reply) {
    reply.view('api', {
        message: ' ' + request.server.version,
        title: 'api mother fuckA'
    });
};

exports.findNearest = function(request, reply) {
  reply('success');
};
