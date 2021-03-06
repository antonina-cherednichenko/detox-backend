// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');
var fs = require('fs');

var cors = require('cors')

// Initialize our Express app.
var app = express();

app.use(cors())
// Configure Stormpath.
// app.use(stormpath.init(app, {
//     expand: {
//         customData: true,
//     },
//     web: {
//         produces: ['application/json']
//     }
// }));

app.use(express.static('public'));

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// app.use(allowCrossDomain);

// Generate a simple home page.
app.get('/', function (req, res) {
    res.send("Hey there! Thanks for visting the site! This is backend of Detox and Diets and Daily Fitness mobile apps");
});

// Retrieving content for Fitness Daily mobile app
app.get('/data_fd', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('content/fitness_programs_data.json', 'utf-8')));
});

app.get('/version_fd', function(req, res) {
   res.send("1");
});

// Retrieving content for Detox & Diets mobile app
app.get('/data', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('content/programs_data.json', 'utf-8')));
});

app.get('/version', function(req, res) {
   res.send("1");
});

// app.get('/data', stormpath.apiAuthenticationRequired, function(req, res) {
//   res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
// })

// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);