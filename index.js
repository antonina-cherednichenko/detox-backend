// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');
var fs = require('fs');

// Initialize our Express app.
var app = express();

// Configure Stormpath.
app.use(stormpath.init(app, {
    expand: {
        customData: true,
    },
    web: {
        produces: ['application/json']
    }
}));

app.use(express.static('public'));

// Generate a simple home page.
app.get('/', function (req, res) {
    res.send("Hey there! Thanks for visting the site! This is backend of Detox and Diets mobile app");
});

// Retrieving content for mobile app
app.get('/data', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('content/programs_data.json', 'utf-8')));
});

// app.get('/data', stormpath.apiAuthenticationRequired, function(req, res) {
//   res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
// })

// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);