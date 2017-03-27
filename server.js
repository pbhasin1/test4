var pg = require('pg');

var connectionString="postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6";

var express = require("express");
var server = express();
server.use(express.logger());
server.get('/', function(request, response) {
  response.send('Hello World!');
});
var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});

//We access a PostgreSQL client

//We use the 'pg' module's recommended client pooling API
//We pass the connect function the database connection string, and a callback function
//'onConnect'. We define that function.


pg.connect(connectionString, function(err, client, done) {
  client.query('SELECT id FROM salesforce2.contact', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});

