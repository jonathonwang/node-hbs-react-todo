const app = require('../app.js');

/**
 * Routes Imports
 */
const indexPage = require('./index.js');
const taskCrud = require('./task.js');

const routes = [
  { route: '/', template: indexPage },
  { route: '/', template: taskCrud }
];

module.exports = routes;
