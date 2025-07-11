const serverless = require('serverless-http');
const app = require('../index'); // Make sure this is the correct path to your main Express file

module.exports = serverless(app); // ✅ CORRECT: exporting function directly
