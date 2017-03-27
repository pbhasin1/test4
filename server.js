var pg = require('pg');

var connectionString="postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6";



//We access a PostgreSQL client

//We use the 'pg' module's recommended client pooling API
//We pass the connect function the database connection string, and a callback function
//'onConnect'. We define that function.
pg.connect(connectionString, onConnect);

function onConnect(err, client, done) {
  //Err - This means something went wrong connecting to the database.
  if (err) {
    console.error(err);
    process.exit(1);
  }

  //For now let's end client
  client.end();
}
