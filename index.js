// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');
 
// Initialize our Express app.
var app = express();
 
// Configure Stormpath.
app.use(stormpath.init(app, {
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF
  },
  website: true,
  web: {
    login: {
      nextUri: '/dashboard'
    }
  }
}));
 
// Generate a simple home page.
app.get('/', function(req, res) {
  res.send("Hey there! Thanks for visting the site! Be sure to <a href='/login'>login</a>!");
});
 
// Generate a simple dashboard page.
app.get('/dashboard', stormpath.loginRequired, function(req, res) {
  res.send('Hi: ' + req.user.email + '. Logout <form action="/logout" method="POST"><button type="submit">Logout</button></form>');
});
 
// Listen for incoming requests and serve them.
app.listen(3000);