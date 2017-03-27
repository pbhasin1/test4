
var express = require('express');

var app = express();
var server;

var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

app.get('/', function sendResponse(req,res) {
    res.status(200).send('Hello World!');
});
