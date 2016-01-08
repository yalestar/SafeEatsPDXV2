exports.home = function(request, reply) {
    reply.view('index', {
        title: ' ' + request.server.version,
        message: 'ssafe eeats'
    });
};

exports.api = function(request, reply) {
    reply.view('api', {
        title: 'api mother fuckA'
    });
};
