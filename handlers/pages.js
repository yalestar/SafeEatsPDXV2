// 'use strict';

// const Wreck = require('wreck');
exports.home = function (request, reply) {
  // Wreck.get("/", { json: true }, (err, res, payload) => {
  //   if (err) {
  //     console.log("err", err);
  //     throw err;
  //   }
  //  reply.view('index', {
  //    title: 'payload',
  //    message: 'user'
  //  });
  // });
  reply.view('index', {
    title: ' ' + request.server.version,
    message: 'ssafe eeats'
  });
};
