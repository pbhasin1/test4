var app = require('./app');
var http = require('http');
var OAuth = require('../oauth.js').OAuth;
var nodeUrl = require('url');
var clientID = '5m5nwqmjremo0kqe4p1ztu3xme5tgrkrqxaomayq';
var clientSecret = 'uzvua0aafhpv0crr01cevmeeddngyuptwlppmaji';
var callbackURL = 'www.google.com';

oa = new OAuth(
    'https://apisandbox.openbankproject.com/oauth/initiate',
    'https://apisandbox.openbankproject.com/oauth/initiate',
    clientID,
    clientSecret,
    '1.0',
    callbackURL,
    'HMAC-SHA1'
);

http.createServer(function (request, response) {
    oa.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
        var urlObj = nodeUrl.parse(request.url, true);
        var authURL = 'https://apisandbox.openbankproject.com/oauth/authorize?oauth_token=' + oAuthToken;
        var handlers = {
            '/': function (request, response) {
                //
                 // Creating an anchor with authURL as href and sending as response
                 
                var body = '<a href="' + authURL + '"> Get Code </a>';
                response.writeHead(200, {
                    'Content-Length': body.length,
                    'Content-Type': 'text/html' });
                response.end(body);
            },
            '/callback': function (request, response) {
                // Obtaining access_token 
                var getOAuthRequestTokenCallback = function (error, oAuthAccessToken,
                                                             oAuthAccessTokenSecret, results) {
                    if (error) {
                        console.log(error);
                        response.end(JSON.stringify({
                            message: 'Error occured while getting access token',
                            error: error
                        }));
                        return;
                    }

                    oa.get('https://apisandbox.openbankproject.com/oauth/token',
                           oAuthAccessToken,
                           oAuthAccessTokenSecret,
                           function (error, twitterResponseData, result) {
                               if (error) {
                                   console.log(error)
                                   res.end(JSON.stringify(error));
                                   return;
                               }
                               try {
                                   console.log(JSON.parse(twitterResponseData));
                               } catch (parseError) {
                                   console.log(parseError);
                               }
                               console.log(twitterResponseData);
                               response.end(twitterResponseData);
                           });
                };

                oa.getOAuthAccessToken(urlObj.query.oauth_token, oAuthTokenSecret,
                                       urlObj.query.oauth_verifier,
                                       getOAuthRequestTokenCallback);

            }
        };
        handlers[urlObj.pathname](request, response);
    })

}).listen(3000);
app.start(process.env.PORT || 3000);
