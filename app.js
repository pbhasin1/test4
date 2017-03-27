
var express = require('express');
var pg = require('pg');
var app = express();
var server;
var connectionString = 'postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6';

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
            const query = client.query("select id,firstname,lastname from salesforce2.contact", function(err, result) {
                if(err) {
                    next(err, undefined);
                }
                else {
                    next(undefined, result.rows);
                }
            });
        }
    });
};
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
