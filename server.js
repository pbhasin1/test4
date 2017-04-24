var express = require('express');
var session = require('express-session')
var util = require('util');
var oauth = require('oauth');

var app = express();

// To get the values for the following fields, please register your client here:
// https://apisandbox.openbankproject.com/consumer-registration
// Then create a file called config.json in this directory 
// and paste your consumer key and secret like this:
//config.json:
//{ 
//"consumerKey": "YOUR CONSUMER KEY GOES HERE",
//"consumerSecret" : "YOUR CONSUMER SECRET GOES HERE"
//}

// Template engine (previously known as Jade)


// This loads your consumer key and secret from a file you create.
//var config = require('./config.json');

// Used to validate forms
var bodyParser = require('body-parser')


// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var _openbankConsumerKey = '5m5nwqmjremo0kqe4p1ztu3xme5tgrkrqxaomayq';
var _openbankConsumerSecret = 'uzvua0aafhpv0crr01cevmeeddngyuptwlppmaji';


// The location, on the interweb, of the OBP API server we want to use.
var apiHost = 'https://apisandbox.openbankproject.com';

var consumer = new oauth.OAuth(
  apiHost + '/oauth/initiate',
  apiHost + '/oauth/token',
  _openbankConsumerKey,
  _openbankConsumerSecret,
  '1.0',                             //rfc oauth 1.0, includes 1.0a
  'www.google.com',
  'HMAC-SHA1');

var cookieParser = require('cookie-parser');
app.use(session({
  secret: "very secret",
  resave: false,
  saveUninitialized: true
}));

var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};
app.get('/', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.status(500).send("Error getting OAuth request token : " + util.inspect(error));
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect(apiHost + "/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
    }
  });
});


app.get('/callback', function(req, res){
  consumer.getOAuthAccessToken(
    req.session.oauthRequestToken,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, result) {
      if (error) {
        //oauthAccessToken, -Secret and result are now undefined
        res.status(500).send("Error getting OAuth access token : " + util.inspect(error));
      } else {
        //error is now undefined
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        res.redirect('/signed_in');
      }
    }
  );
});


app.get('/signed_in', function(req, res){

  alert('logged in');

   // 'Signing in by OAuth worked. Now you can do API calls on private data like this: <br><a href="/getMyAccounts">Get My Accounts</a> <br><a href="/getCurrentUser">Get Current User</a> <br><a href="/createTransactionRequest">Create Transaction Request (make payment)</a> <br> <a href="/loadCustomers">Load Customers (this is an admin utility function) </a> <br>  <br> Please see the <a href="https://apiexplorersandbox.openbankproject.com">API Explorer</a> for the full list of API calls available.')
});


app.get('*', function(req, res){
  res.redirect('/connect');
});
app.start(process.env.PORT || 3000);
