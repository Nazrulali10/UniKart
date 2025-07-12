const serverless = require('serverless-http');
const App = require('../index'); // Make sure this is the correct path to your main Express file

module.exports = serverless(App); // ✅ CORRECT: exporting function directly
