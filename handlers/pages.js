'use strict';

const Wreck = require('wreck');
exports.home = function (request, reply) {
    // const apiUrl = this.apiBaseUrl + '/recipes';
    Wreck.get("/", { json: true }, (err, res, payload) => {
        if (err) {
            throw err;
        }
        reply.view('index', {
            recipes: payload,
            user: request.session.get('user')
        });
    });
};
