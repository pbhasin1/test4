
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
var connectionString = 'postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6';


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/update', function(req, res) {
    pg.connect(connectionString, function (err, conn, done) {
        alert('hi');
        // watch for any connect issues
        if (err) console.log(err);
        conn.query('select id,firstname,lastname from salesforce2.contact',
            [req.body.firstname.trim()],
            function(err, result) {
                if (err != null || result.rowCount == 0) {
                 function(err, result) {
                    done();
                    if (err) {
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    done();
                    res.json(result);
                }
            }
           
        );
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
