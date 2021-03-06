'use strict';

const Pages = require('./handlers/pages');
const Actions = require('./handlers/actions');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: Pages.home
  },
  {
    method: 'GET',
    path: '/api',
    handler: Pages.api
  },
  {
    method: 'GET',
    path: '/find_nearest',
    handler: Actions.findNearest
  }
];
// {
//     method: 'GET',
//     path: '/recipes/{id}',
//     handler: Pages.viewRecipe
// }, {
//     method: 'GET',
//     path: '/create',
//     handler: Pages.createRecipe
// }, {
//     method: 'GET',
//     path: '/logout',
//     handler: Actions.logout
// }, {
//     method: 'POST',
//     path: '/login',
//     config: {
//         payload: {
//             output: 'data'
//         }
//     },
//     handler: Actions.login
// }, {
//     method: 'POST',
//     path: '/create',
//     config: {
//         payload: {
//             output: 'data'
//         }
//     },
//     handler: Actions.createRecipe
// }, {
//     method: 'GET',
//     path: '/{param*}',
//     handler: Assets.servePublicDirectory
// }];
