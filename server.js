var pg = require('pg');

var conString="postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6";
winston.level = 'debug';

pg.connect(conString, function(err, client, done) {
  if(err) {
    console.log('Error connecting to Postgres');
    console.log('err', err);
    return 1;
  } else {
    console.log("Successfully connected");
    client.query("select id,firstname,lastname from salesforce2.contact", function(err, result){
      done();
      if(err) {
        console.log('Error reading from Postgres');
        return 1;
      }
      else{
        console.log('Results: ', result);
      }
    });
  }
});
