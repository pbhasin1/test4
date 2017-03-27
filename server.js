var pg = require('pg');
var winston = require('winston');
var conString="postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6";
winston.level = 'debug';

pg.connect(conString, function(err, client, done) {
  if(err) {
    winston.debug('Error connecting to Postgres');
    winston.debug('err', err);
    return 1;
  } else {
    winston.debug("Successfully connected");
    client.query("select id,firstname,lastname from salesforce2.contact", function(err, result){
      done();
      if(err) {
        winston.error('Error reading from Postgres');
        return 1;
      }
      else{
        winston.info('Results: ', result);
      }
    });
  }
});
