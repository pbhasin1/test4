
var express = require('express');
var pg = require('pg');
var app = express();
var server;
var connectionString = 'postgres://tijurpxfuncvvn:4d844b13e61da666b5055e284a696e75d6c8e41033dc2098cdb352f8708b4a64@ec2-54-243-185-123.compute-1.amazonaws.com:5432/d5q988qc4a2f8a';

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
            const query = client.query("select name, Id,SFID,ParentId, RecordTypeId from salesforce34.account where parentId = '0017F000003o5rRQAQ'", function(err, result) {
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
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("insert into salesforce34.account (Name,Active__c,ParentId) "+ 
                                "values ('"+req.query.fName+"','"+true+"','"+u
                                    +"')");    
        res.header("Access-Control-Allow-Headers","Content-Type");
            res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS");
            res.header("Access-Control-Allow-Origin","*");
            res.status(200).send('contact added');
    });    
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
