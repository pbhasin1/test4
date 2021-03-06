
var express = require('express');
var pg = require('pg');
var app = express();
var server;
var crypto = require('crypto'); 

var connectionString = 'postgres://eptcbxyuxcctev:f21325c065fb3be7ba777791f8c45860f28bb6160d855b7c42a470c8d989ea41@ec2-54-163-252-55.compute-1.amazonaws.com:5432/d19d61pq097bu0';

var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

app.get('/', function sendResponse(req,res) {
    res.status(200).send('Hello World!');
});
app.get('/db', function sendResponse(req,res) {
    getMessage(1, function(err, msg) {
        if(err){
            res.status(404).send("404: Error talking to database " + err);
        }
        else{
            res.header("Access-Control-Allow-Headers","Content-Type");
            res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS");
            res.header("Access-Control-Allow-Origin","*");
            res.status(200).send(msg);
        }
    });
});
function getMessage(id, next) {
    pg.connect(connectionString, function(err, client, done){
        if(err) {
            next(err, undefined);
        }
        else{
            const query = client.query("select name, Id,SFID,ParentId,Site,RecordTypeId from salesforce34.account where parentId = '0017F000003o5rRQAQ'", function(err, result) {
                if(err) {
                    next(err, undefined);
                }
                else {
                    var a = '{"contacts":';
                    var b= '}';
                    var c = a+JSON.stringify(result.rows)+b;
                    next(undefined,c);
                }
            });
        }
    });
};
app.get('/addRecord', function sendResponse(req,res) {
        //var pg = require('pg');          
        //var conString = process.env.DATABASE_URL ||  "postgres://postgres:Welcome123@localhost:5432/postgres";
    var u = '0017F000003o5rRQAQ';
    var No = 'No';
    
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("insert into salesforce34.account (Name,Active__c,ParentId,Site) "+ 
                                "values ('"+req.query.fName+"','"+No+"','"+u
                                    +"','"+req.query.bankname+"')");    
        res.header("Access-Control-Allow-Headers","Content-Type");
            res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS");
            res.header("Access-Control-Allow-Origin","*");
            res.status(200).send('contact added');
    });
/*var expect  = require('chai').expect;
var Request = require('request');
var OAuth   = require('../../oauth-1.0a');
var crypto = require('crypto');

describe.skip("Openbank Personal Consumer", function() {
    this.timeout(10000);

    var oauth = new OAuth({
        consumer: {
            key: process.env.OPENBANK_CONSUMER_PUBLIC,
            secret: process.env.OPENBANK_CONSUMER_SECRET
        },
        signature_method: 'HMAC-SHA256',
        hash_function: function(base_string, key) {
            return crypto.createHmac('sha256', key).update(base_string).digest('base64');
        }
    });

    //need to send as header
    describe("#Request Token", function() {
        var request = {
            url:    'https://apisandbox.openbankproject.com/oauth/initiate',
            method: 'POST',
            data: {
                oauth_callback: 'http://www.ddo.me'
            }
        };

        it("should be a valid response", function(done) {
            Request({
                url:        request.url,
                method:     request.method,
                form:       request.data,
                headers:    oauth.toHeader(oauth.authorize(request))
            }, function(err, res, body) {
                expect(body).to.be.a('string');

                body = oauth.deParam(body);

                expect(body).to.have.property('oauth_callback_confirmed', 'true');
                expect(body).to.have.property('oauth_token');
                expect(body).to.have.property('oauth_token_secret');

                done();
            });
        });
    });
});
*/


/*

var http = require('http');
var OAuth = require('oauth-1.0a.js').OAuth;
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
/*app.get('/oauthMethod', function sendResponse(req,res) {
var oauth = OAuth({
    consumer: {
        key: '5m5nwqmjremo0kqe4p1ztu3xme5tgrkrqxaomayq',
        secret: 'uzvua0aafhpv0crr01cevmeeddngyuptwlppmaji'
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});
});*/
//app.get('/db', function sendResponse(req,res) {
    //res.status(200).send("Database Data Placeholder");
//});
//var config = require('app.json');

//app.get('/config', function sendResponse(req,res) {
   // res.json({    });
//});
//var c;
/*app.get('/db', function sendResponse(req,res) {
    //getMessage(1, function(err, msg) {
       // if(err){
          //  res.status(404).send("404: Error talking to database ");
       // }
       // else{
            //res.status(200).send(msg);
            pg.connect(connectionString, function(err, client, done){
            if(err) {
                next(undefined);
            }
            else {
                client.query("select id,firstname from salesforce2.contact", function(err, result) {
                    if(err) {
                        next(undefined);
                    }
                    else{
                        c=result.rows[0].firstname;
                        next(result.rows[0].firstname);
                        
                    }
                });
            }
            done();
                res.status(200).send('ccccc----'+c);
        });
        }
    });
});

function getMessage(id, next){
        pg.connect(connectionString, function(err, client, done){
            if(err) {
                next(undefined);
            }
            else {
                client.query("select id,firstname from salesforce2.contact", function(err, result) {
                    if(err) {
                        next(undefined);
                    }
                    else{
                        next(result.rows[0].firstname);
                    }
                });
            }
            done();
        });
    };*/
/*app.get('/getContacts', function sendResponse1(req,res) {
    const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM salesforce2.contact;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});*/
