const serverless = require('serverless-http');
const App = require('../index'); // Use your existing index.js

module.exports.handler = serverless(App);
